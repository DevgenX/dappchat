"use client";

import { FC, useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import Avatar from "@/components/common/Avatar";

interface FriendProps {
  name: string;
  address: string;
}

const friends: FriendProps[] = [
  {
    name: "Jason",
    address: "0x7213232",
  },
  {
    name: "Mark",
    address: "0x7213232",
  },
  {
    name: "John",
    address: "0x7213232",
  },
];

interface FriendListProps {
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
}

const FriendList: FC<FriendListProps> = ({ selectedUser, setSelectedUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const selectFriend = (user: string) => {
    setSelectedUser(user);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logout");
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
              <div className="pr-3 hover:scale-125">
                <BsFillPersonPlusFill size={20} />
              </div>
              <div onClick={toggleDropdown} className="hover:scale-125">
                <CiMenuKebab size={20} />
              </div>
              {isDropdownOpen && (
                <div className="absolute bg-black py-2 px-4 rounded-md shadow right-0 mt-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-white hover:text-gray-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          {friends.map((friend, index) => (
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
              <div className="flex gap-2 py-2 pl-4 items-center justify-center">
                <Avatar id={index} name={friend.name} />
                <span>{friend.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendList;
