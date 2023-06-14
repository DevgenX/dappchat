import { FC } from "react";
import Avatar from "@/components/common/Avatar";
import { FriendListType } from "@/context/ChatTypes";

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
  console.log(friend);
  return (
    <div>
      <div
        key={index}
        onClick={() => selectFriend(friend.name)}
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
            <Avatar id={index} name={friend.name} />
            <span>{friend.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FriendCard;
