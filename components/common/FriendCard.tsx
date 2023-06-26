import { FC } from "react";
import Avatar from "@/components/common/Avatar";
import { FriendListType } from "@/context/ChatTypes";
import Link from "next/link";
import { useChatContext } from "@/context/DappChat.context";

interface FriendProps {
  index: number;
  selectFriend: (name: string) => void;
  selectedUser: string;
  friend: FriendListType;
}

const FriendCard: FC<FriendProps> = ({
  index,
  selectFriend,
  selectedUser,
  friend,
}) => {
  const { getUserMessages } = useChatContext();

  const handleSelectFriend = (friend: string) => {
    selectFriend(friend);
    getUserMessages(friend);
  };

  const getUserName = (username: string) => {
    if (!username) return;

    if (username.length > 8) {
      return username.charAt(0).toUpperCase() + username.slice(1, 6);
    } else {
      return username;
    }
  };

  return (
    <Link
      href={{
        pathname: "/chat",
        query: { name: `${friend.name}`, friendkey: `${friend.friendkey}` },
      }}
    >
      <div
        key={index}
        onClick={() => handleSelectFriend(friend.friendkey)}
        className={`border-b border-gray-500 hover:bg-slate-600 flex mb-2 items-center gap-2 ${
          selectedUser?.trim().toLowerCase() ===
          friend.name.trim().toLowerCase()
            ? "bg-slate-600"
            : ""
        }`}
      >
        {selectedUser === friend.name && (
          <div className="w-1 bg-blue-500 h-12 rounded-r-md"></div>
        )}
        <div className="flex items-center">
          <div className="flex gap-2 py-2 pl-4 items-center justify-center">
            <Avatar id={index} />
            <span>{getUserName(friend.name)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default FriendCard;
