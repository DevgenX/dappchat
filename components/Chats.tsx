import React from "react";
import { BsSendFill, BsFillPersonPlusFill } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import Avatar from "@/components/ui/Avatar";

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

const Chats = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="container mx-auto">
        <div className="flex flex-col h-3/4 mx-auto md:max-w-5xl md:flex-row">
          <div className="bg-slate-400 dark:bg-slate-600 p-2 w-full md:w-1/3 text-white md:rounded-l-lg mb-4 md:mb-0">
            <div className="flex flex-row my-3 justify-between border-b border-gray-500">
              <div className="mx-3">John Doe</div>
              <div className="flex flex-row mx-3 cursor-pointer">
                <div className="pr-3">
                  <BsFillPersonPlusFill size={20} />
                </div>
                <div>
                  <CiMenuKebab size={20} />
                </div>
              </div>
            </div>

            {friends.map((friend, index) => (
              <div
                className="border-b border-gray-500 py-2 flex items-center gap-2"
                key={index}
              >
                <Avatar id={index} name={friend.name} />
                <span>{friend.name}</span>
              </div>
            ))}
          </div>
          <div className="w-full md:w-2/3 text-black">
            <div className="h-full flex flex-col rounded-lg md:rounded-tr-lg">
              <div className="flex-grow bg-slate-300 p-4">
                messages with selected person
              </div>
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  placeholder="Message..."
                  className="bg-white flex-grow rounded-sm outline-none p-2"
                />
                <button className="absolute bg-blue-500 p-2 text-white mt-1 rounded-full right-1">
                  <BsSendFill />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
