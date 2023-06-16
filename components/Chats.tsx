"use client";

import { FC, useState } from "react";
import { useSearchParams } from "next/navigation";

import InputBox from "@/components/common/InputBox";
import FriendList from "@/components/common/FriendList";
import EmptyMessage from "./common/EmptyMessage";
import { useChatContext } from "@/context/ChatDapp.context";
import Icons from "@/components/Icons";
import Messages from "@/components/Messages";
import Loading from "@/components/common/Loading";

const Chats: FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [blockModal, setBlockModal] = useState<boolean>(false);

  const toggleBlock = () => {
    setBlockModal(() => !blockModal);
  };

  const params = useSearchParams();

  const { handleSendMessage, isLoading, handleBlockUser } = useChatContext();

  return (
    <div className="flex flex-row min-h-screen">
      <div className="container mx-auto">
        <div className="mx-5 md:min-h-[70%] md:mx-auto md:max-w-5xl md:flex md:flex-row">
          <FriendList
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          <div className="w-full md:w-2/3  text-black md:rounded-r-lg bg-slate-400">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="h-full  flex flex-col">
                <div className="flex text-slate-800 justify-between px-2 py-2">
                  <p>Getting spammed by this user?</p>
                  <Icons.Ban
                    size={17}
                    className="self-center text-red-400 cursor-pointer hover:scale-105"
                    onClick={() => handleBlockUser(params.get("pubkey") || " ")}
                  />
                </div>
                <div className="flex-grow max-h-[100%] bg-slate-200 p-4 height: 100vh">
                  {selectedUser ? <Messages /> : <div>{<EmptyMessage />}</div>}
                </div>
                <InputBox sendMessage={handleSendMessage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
