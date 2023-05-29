"use client";

import React, {
  FC,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { ethers } from "ethers";
import { toast } from "@/components/ui/Toast";

import {
  FriendListType,
  MessagesType,
  UserListsType,
  BlockedUsersType,
  initialState,
  InitialStateInterface,
} from "@/context/ChatTypes";
import {
  connectWallet,
  CheckIsWalletConnected,
  connectToSmartContract,
} from "@/utils/Api";

export const ChatContext = createContext<InitialStateInterface>(initialState);

export const ChatProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [friendList, setFriendList] = useState<FriendListType[]>([]);
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [userList, setUserList] = useState<UserListsType[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<BlockedUsersType[]>([]);

  const fetchUserData = async () => {
    try {
      const contract = await connectToSmartContract();
      console.log(contract);

      const setUser = await connectWallet();
      setAccount(setUser);

      const getUsername = await contract.getUsername();
      setUsername(getUsername);

      const friendsArray = await contract.getFriends();
      setFriendList(friendsArray);

      const getAllUsers = await contract.getAllAppUsers();
      setUserList(getAllUsers);

      const getBlockedUsers = await contract.getAllBlockedUsers();
      setBlockedUsers(getBlockedUsers);
    } catch (err) {
      toast({
        title: "Fetching user data",
        message: "Error fetching user data",
        type: "error",
      });
    }
  };

  const createAccount = async ({ name }: { name: string }): Promise<void> => {
    try {
      setIsLoading(true);
      const contract = await connectToSmartContract();
      if (!name || !contract) return;
      await contract.createUser(name);
      window.location.reload();
    } catch (err) {
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
    try {
      if (!content || !address) return;

      setIsLoading(true);
      const contract = await connectToSmartContract();
      await contract.sendMessage(address, content);
    } catch (err) {
      toast({
        title: "Error sending a message",
        message: "It seems you are not friends with this user",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFriend = async ({
    address,
    name,
  }: {
    address: string;
    name: string;
  }): Promise<void> => {
    try {
      if (!address || !name) return;

      setIsLoading(true);

      const contract = await connectToSmartContract();
      await contract.addFriend(address, name);
    } catch (err) {
      toast({
        title: "Error adding a friend",
        message: "It seems you are adding an unregistered user",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlockUser = async (address: string) => {
    try {
      if (!address) return;
      setIsLoading(true);

      const contract = await connectToSmartContract();
      await contract.blockUser(address);
    } catch (err) {
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
    try {
      const contract = await connectToSmartContract();
      const getMessages = await contract.readMessages(address);
      setMessages(getMessages);
    } catch (err) {
      toast({
        title: "Error fetching user messages",
        message: "It seems you are trying to access messages from unknown user",
        type: "error",
      });
    }
  };

  useEffect(() => {
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
        userList,
        blockedUsers,
        connectWallet,
        createAccount,
        getUserMessages,
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
