"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import { toast } from "@/components/common/Toast";

import {
  FriendListType,
  MessagesType,
  UserListsType,
  BlockedUsersType,
  initialState,
  InitialStateInterface,
} from "@/context/ChatTypes";
import { connectToSmartContract } from "@/utils/Api";

export const ChatContext = createContext<InitialStateInterface>(initialState);

export const ChatProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [friendList, setFriendList] = useState<FriendListType[]>([]);
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [userList, setUserList] = useState<UserListsType[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<BlockedUsersType[]>([]);

  const fetchUserData = async () => {
    try {
      const contract = await connectToSmartContract();

      // const getUsername = await contract.getUsername();
      // setUsername(getUsername);

      // const friendsArray = await contract.getFriends();
      // setFriendList(friendsArray);

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

  const getUsername = async (address: string) => {
    try {
      const contract = await connectToSmartContract();
      const getUsername = await contract.getUsername(address);
      setNickname(getUsername);
    } catch (err) {
      toast({
        title: "Error fetching username",
        message: "It seems you are trying to access messages from unknown user",
        type: "error",
      });
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
