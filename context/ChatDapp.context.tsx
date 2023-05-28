"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
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
    } catch (err) {
      toast({
        title: "Fetching user data",
        message: "Error fetching user data",
        type: "error",
      });
    }
  };

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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
