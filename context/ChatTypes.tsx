export type FriendListType = {
  name: string;
  address: string;
};

export type MessagesType = {
  address: string;
  content: string;
};

export type UserListsType = {
  name: string;
  address: string;
};

export type BlockedUsersType = {
  address: string;
};

export const initialState = {
  isLoading: false,
  account: "",
  username: "",
  friendList: [],
  messages: [],
  userList: [],
  blockedUsers: [],
};

export interface InitialStateInterface {
  isLoading: boolean;
  account: string;
  username: string;
  friendList: FriendListType[];
  messages: MessagesType[];
  userList: UserListsType[];
  blockedUsers: BlockedUsersType[];
}
