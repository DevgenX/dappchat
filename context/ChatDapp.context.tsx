"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import { toast } from "@/components/common/Toast";
import { useRouter, usePathname } from "next/navigation";

import {
  FriendListType,
  MessagesType,
  UserList,
  BlockedUsersType,
  initialState,
  InitialStateInterface,
} from "@/context/ChatTypes";
import { connectToSmartContract } from "@/lib/Api";

export const ChatContext = createContext<InitialStateInterface>(initialState);

export const ChatProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [friendList, setFriendList] = useState<FriendListType[]>([]);
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [userList, setUserList] = useState<UserList[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<BlockedUsersType[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const router = useRouter();
  const pathname = usePathname();

  const fetchUserData = async () => {
    try {
      const contract = await connectToSmartContract();
      const friendsArray = await contract.getFriends();
      setFriendList(friendsArray);
      const getAllUsers = await contract.getAllAppUsers();
      setUserList(getAllUsers);
      const getBlockedUsers = await contract.getAllBlockedUsers();
      setBlockedUsers(getBlockedUsers);
    } catch (err) {
      toast({
        title: "Error fetching user data",
        message: "There seems to be a problem fetching user data",
        type: "error",
      });
    }
  };

  const CheckIsWalletConnected = async (): Promise<void> => {
    try {
      if (!window.ethereum) {
        toast({
          title: "Wallet is not connected",
          message: "Please connect your wallet",
          type: "error",
        });
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setAccount(accounts[0]);
      }
    } catch (e) {
      console.log(e);

      throw new Error("No ethereum account found");
    }
  };

  const connectWallet = async (): Promise<void> => {
    try {
      if (!window.ethereum) {
        toast({
          title: "Wallet is not connected",
          message: "Please connect your wallet",
          type: "error",
        });
      }
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (e) {
      console.log(e);

      throw new Error("No ethereum account found");
    }
  };

  const createAccount = async ({ name }: { name: string }): Promise<void> => {
    setIsLoading(true);
    try {
      const contract = await connectToSmartContract();
      if (!name || !contract) return;
      const newUser = await contract.createUser(name);
      await newUser.wait();
      setIsLoading(false);
      if (newUser) {
        toast({
          title: "Happy Chatting!",
          message: "Successfully Created an Account",
          type: "success",
        });
      }
      router.push("/chat");
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error creating an account",
        message:
          "It seems the account already exists. Please try again using another wallet",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async ({
    content,
    address,
  }: {
    content: string;
    address: string;
  }): Promise<void> => {
    setIsLoading(true);
    try {
      if (!content || !address) return;
      const contract = await connectToSmartContract();
      const newMessage = await contract.sendMessage(address, content);
      await newMessage.wait();
      setIsLoading(false);
      if (newMessage) {
        toast({
          title: "Message Sent",
          message: "Successfuly sent a message to your friend",
          type: "success",
        });
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error sending a message",
        message: "It seems you are not friends with this user",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const handleAddFriend = async ({
    address,
    name,
  }: {
    address: string;
    name: string;
  }): Promise<void> => {
    setIsLoading(true);
    try {
      if (!address || !name) return;
      const contract = await connectToSmartContract();
      const newFriend = await contract.addFriend(address, name);
      await newFriend.wait();
      setIsLoading(false);
      window.location.reload();
      if (newFriend) {
        toast({
          title: "Added Successfully!",
          message: "Successfuly added a new friend.",
          type: "success",
        });
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error adding a friend",
        message: "It seems you are adding an unregistered user",
        type: "error",
      });
    }
  };

  const handleBlockUser = async (address: string) => {
    setIsLoading(true);
    try {
      if (!address) return;
      const contract = await connectToSmartContract();
      const newBlockedUser = await contract.blockUser(address);
      await newBlockedUser.wait();
      setIsLoading(false);
      window.location.reload();
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error blocking a user",
        message: "It seems you are blocking an unregistered user",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUserMessages = async (address: string) => {
    setIsLoading(true);
    try {
      const contract = await connectToSmartContract();
      const getMessages = await contract.readMessages(address);
      setMessages(getMessages);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error fetching user messages",
        message: "It seems you are trying to access messages from unknown user",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUsername = async (address: string): Promise<string | undefined> => {
    try {
      if (account) {
        const contract = await connectToSmartContract();
        const currentUsername = await contract.getUsername(address);
        return currentUsername;
      }
    } catch (err) {
      toast({
        title: "Error fetching username",
        message:
          "There seem to be an error while fetching your username. Please wait for a moment while we load your username",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    CheckIsWalletConnected();
    fetchUserData();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        isLoading,
        username,
        account,
        friendList,
        messages,
        setCurrentUser,
        currentUser,
        input,
        setInput,
        userList,
        blockedUsers,
        connectWallet,
        createAccount,
        getUserMessages,
        getUsername,
        handleSendMessage,
        handleBlockUser,
        handleAddFriend,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
