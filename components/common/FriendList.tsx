"use client";

import { FC, useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Icons } from "@/components/Icons";
import FriendModal from "@/components/common/FriendModal";
import { useChatContext } from "@/context/ChatDapp.context";
import FriendCard from "@/components/common/FriendCard";

interface FriendListProps {
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
}

const FriendList: FC<FriendListProps> = ({ selectedUser, setSelectedUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { friendList } = useChatContext();

  const handleLogout = () => {};

  const selectFriend = (user: string) => {
    setSelectedUser(user);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(() => !isDropdownOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(() => !isModalOpen);
  };

  return (
    <>
      <div className="bg-slate-500 p-2 md:w-1/3 text-white md:rounded-l-lg mb-4 md:mb-0 relative">
        <div className="my-3 gap-2">
          <div className="flex justify-between border-b border-gray-500 mx-3">
            <div className="mb-3">
              <h1>John Doe</h1>
            </div>
            <div className="flex cursor-pointer">
              <div onClick={toggleModal} className="pr-3 hover:scale-125">
                <BsFillPersonPlusFill size={20} />
              </div>
              {isModalOpen && (
                <FriendModal
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              )}
              <div onClick={toggleDropdown} className="hover:scale-125">
                <Icons.MoreVertical size={20} />
              </div>
              {isDropdownOpen && (
                <div className="absolute bg-black py-1 px-3 rounded-md shadow right-0 mt-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-white hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
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
