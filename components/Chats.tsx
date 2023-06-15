"use client";

import { FC, useState } from "react";
import InputBox from "@/components/common/InputBox";
import FriendList from "@/components/common/FriendList";
import EmptyMessage from "./common/EmptyMessage";
import { useChatContext } from "@/context/ChatDapp.context";
import { usePathname } from "next/navigation";
import Icons from "@/components/Icons";
import Messages from "@/components/Messages";

const Chats: FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [blockModal, setBlockModal] = useState<boolean>(false);

  const toggleBlock = () => {
    setBlockModal(() => !blockModal);
  };

  const { handleSendMessage } = useChatContext();
  const pathname = usePathname();

  return (
    <div className="flex flex-row min-h-screen">
      <div className="container mx-auto">
        <div className="mx-5 md:min-h-[70%] md:mx-auto md:max-w-5xl md:flex md:flex-row">
          <FriendList
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          <div className="w-full md:w-2/3 text-black md:rounded-r-lg bg-slate-400">
            <div className="h-full flex flex-col">
              <div className="flex text-slate-800 justify-between px-2 py-2">
                <p>Getting spammed by a user?</p>
                <Icons.Ban
                  size={17}
                  className="self-center text-red-400 cursor-pointer hover:scale-105"
                  onClick={toggleBlock}
                />
                {/* {blockModal && (
                  <div className="absolute bg-black py-1 px-3 rounded-md shadow right-0 mt-10">
                    <button
                      onClick={toggleBlock}
                      className="block w-full text-white hover:scale-105"
                    >
                      Block
                    </button>
                  </div>
                  
                )} */}
              </div>
              <div className="flex-grow bg-slate-200 p-4 ">
                {pathname === "/chat" ? (
                  <Messages />
                ) : (
                  <div>{<EmptyMessage />}</div>
                )}
              </div>
              <InputBox sendMessage={handleSendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
