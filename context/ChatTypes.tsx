import { SetStateAction } from "react";

export type FriendListType = {
  name: string;
  pubkey: string;
};

export type MessagesType = {
  address: string;
  content: string;
};

export interface UserList {
  name: string;
  accountAddress: string;
}

export type BlockedUsersType = {
  address: string;
};

export interface InitialStateInterface {
  isLoading: boolean;
  account: string;
  username: string;
  friendList: FriendListType[];
  messages: MessagesType[];
  userList: UserList[];
  blockedUsers: BlockedUsersType[];
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
  currentUser: string;
  connectWallet: () => Promise<void> | "";
  createAccount: ({ name }: { name: string }) => Promise<void> | "";
  getUserMessages: (address: string) => Promise<void> | [];
  getUsername: (address: string) => Promise<string | undefined> | "";
  handleSendMessage: ({
    content,
    address,
  }: {
    content: string;
    address: string;
  }) => Promise<void> | "";
  handleAddFriend: ({
    address,
    name,
  }: {
    address: string;
    name: string;
  }) => Promise<void> | "";
  handleBlockUser: (address: string) => Promise<void> | "";
}

export const initialState: InitialStateInterface = {
  isLoading: false,
  account: "",
  username: "",
  friendList: [],
  messages: [],
  userList: [],
  blockedUsers: [],
  setCurrentUser: () => "",
  currentUser: "",
  connectWallet: () => "",
  createAccount: () => "",
  getUserMessages: () => [],
  getUsername: () => "",
  handleSendMessage: () => "",
  handleAddFriend: () => "",
  handleBlockUser: () => "",
};
