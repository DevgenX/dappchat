"use client";

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import { toast } from "@/components/common/Toast";
import { useRouter } from "next/navigation";

import {
  FriendListType,
  MessagesType,
  UserList,
  initialState,
  InitialStateInterface,
} from "@/context/ChatTypes";
import { connectToSmartContract } from "@/lib/Api";

export const ChatContext = createContext<InitialStateInterface>(initialState);

export const ChatProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [friendList, setFriendList] = useState<FriendListType[]>([]);
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [userList, setUserList] = useState<UserList[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [registeredUser, setRegisteredUser] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const router = useRouter();

  const fetchUserData = async () => {
    try {
      if (!account) return;
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
        message:
          "It seems you don't have an account created. Please create an account to use the application.",
        type: "error",
      });
    }
  };

  const checkWalletConnection = useCallback(async () => {
    try {
      if (!window.ethereum) return;

      const walletAccounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (walletAccounts.length) {
        setAccount(walletAccounts[0]);
      }
    } catch (e) {
      return;
    }
  }, []);

  const connectWallet = async () => {
    try {
      await window.ethereum.enable();
      const walletAccounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(walletAccounts[0]);
    } catch (e) {
      toast({
        title: "Wallet is not connected",
        message: "Please connect your wallet to use the application.",
        type: "error",
      });
    }
  };

  const createAccount = async ({ name }: { name: string }): Promise<void> => {
    setIsLoading(true);
    try {
      const contract = await connectToSmartContract();
      if (!name || !contract) return;
      const newUser = await contract.createUser(name);
      setRegisteredUser(newUser);
      await newUser.wait();
      setIsLoading(false);

      if (typeof window !== "undefined") {
        window.location.reload();
      }

      if (newUser) {
        toast({
          title: "Happy Chatting!",
          message: "Successfully created an account.",
          type: "success",
        });
      }

      router.push("/users");
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error creating an account",
        message:
          "It seems the account already exists. Please try again using another wallet.",
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
          title: "Message Sent!",
          message: "Successfuly sent a message to your friend.",
          type: "success",
        });
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error sending a message",
        message: "It seems you are not friends with this user.",
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
      if (typeof window !== "undefined") {
        window.location.reload();
      }

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
        message:
          "It seems you are adding an unregistered or a user that you blocked.",
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
      toast({
        title: "Successfully blocked a user!",
        message: "User has been blocked and won't be able to message you.",
        type: "success",
      });
      setIsLoading(false);
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error blocking a user",
        message:
          "There seems to be an error while blocking this user. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblockUser = async (address: string) => {
    setIsLoading(true);
    try {
      if (!address) return;
      const contract = await connectToSmartContract();
      const unblockedUser = await contract.unblockUser(address);
      await unblockedUser.wait();
      toast({
        title: "Successfully unblocked a user!",
        message: "You can now message the user to start a conversation.",
        type: "success",
      });
      setIsLoading(false);

      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error unblocking a user",
        message:
          "There seems to be an error while unblocking this user. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUserMessages = async (address: string) => {
    setIsLoading(true);
    try {
      if (!account && !registeredUser) {
        toast({
          title: "Error fetching user data",
          message: "Please create an account to access the application",
          type: "error",
        });
      }
      const contract = await connectToSmartContract();
      const getMessages = await contract.readMessages(address);
      setMessages(getMessages);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getUsername = useCallback(
    async (address: string): Promise<string | undefined> => {
      try {
        if (!account) return;
        const contract = await connectToSmartContract();
        const currentUsername = await contract.getUsername(address);
        return currentUsername;
      } catch (err) {
        return;
      }
    },
    [account]
  );

  const detectChainChange = () => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    checkWalletConnection();
    fetchUserData();
    detectChainChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, messages]);

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
        handleUnblockUser,
        handleAddFriend,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
