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

export interface InitialStateInterface {
  isLoading: boolean;
  account: string;
  username: string;
  friendList: FriendListType[];
  messages: MessagesType[];
  userList: UserListsType[];
  blockedUsers: BlockedUsersType[];
  connectWallet: () => Promise<void> | "";
  createAccount: ({ name }: { name: string }) => Promise<void> | "";
  getUserMessages: (address: string) => Promise<void> | [];
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
  connectWallet: () => "",
  createAccount: () => "",
  getUserMessages: () => [],
  handleSendMessage: () => "",
  handleAddFriend: () => "",
  handleBlockUser: () => "",
};
