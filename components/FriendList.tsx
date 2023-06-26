"use client";

import { FC, useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Icons } from "@/components/Icons";
import FriendModal from "@/components/common/FriendModal";
import { useChatContext } from "@/context/DappChat.context";
import FriendCard from "@/components/common/FriendCard";
import BlockModal from "./common/BlockedModal";

interface FriendListProps {
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
}

const FriendList: FC<FriendListProps> = ({ selectedUser, setSelectedUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { friendList, currentUser } = useChatContext();

  const selectFriend = (user: string) => {
    setSelectedUser(user);
  };

  const toggleBlockModal = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
    <>
      <div className="bg-slate-500 p-2 md:w-1/3 text-white md:rounded-l-lg mb-4 md:mb-0 relative">
        <div className="my-3 gap-2">
          <div className="flex justify-between border-b border-gray-500 mx-3">
            <div className="mb-3">
              <h1>{getUserName(currentUser)}</h1>
            </div>
            <div className="flex">
              <div onClick={toggleBlockModal} className="hover:scale-125">
                <Icons.MoreVertical size={20} />
              </div>
              {isDropdownOpen && (
                <BlockModal toggleBlockModal={toggleBlockModal} />
              )}
            </div>
          </div>
          {friendList.map((friend, index) => (
            <FriendCard
              key={index}
              index={index}
              selectFriend={selectFriend}
              selectedUser={selectedUser}
              friend={friend}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendList;
