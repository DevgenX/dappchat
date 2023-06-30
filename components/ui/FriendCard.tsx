import { FC, useState, useCallback, useMemo, memo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Avatar from "@/components/common/Avatar";
import { FriendListType } from "@/context/ChatTypes";
import { useChatContext } from "@/context/DappChat.context";

interface FriendProps {
  index: number;
  selectFriend: (name: string) => void;
  selectedUser: string;
  friend: FriendListType;
  getUsername: (name: string) => string | undefined;
}

const FriendCard: FC<FriendProps> = memo(
  ({ index, selectFriend, selectedUser, friend, getUsername }) => {
    const { getUserMessages } = useChatContext();

    const handleSelectFriend = useCallback(async () => {
      await getUserMessages(friend.friendkey);
      selectFriend(friend.name);
    }, [friend.friendkey, friend.name, getUserMessages, selectFriend]);

    const username = useMemo(
      () => getUsername(friend.name),
      [friend.name, getUsername]
    );

    return (
      <Link
        href={{
          pathname: "/chat",
          query: { name: friend.name, friendkey: friend.friendkey },
        }}
      >
        <div
          key={index}
          onClick={handleSelectFriend}
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
              <span>{username}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
);

FriendCard.displayName = "FriendCard";
export default FriendCard;
