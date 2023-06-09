"use client";

import { FC, useState } from "react";
import Message from "@/components/common/Message";
import FriendList from "@/components/common/FriendList";
import EmptyMessage from "./common/EmptyMessage";
import { useChatContext } from "@/context/ChatDapp.context";

const Chats: FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const { handleSendMessage } = useChatContext();

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
              <div className="flex-grow bg-slate-200 p-4 md:rounded-tr-lg">
                {!selectedUser && <div>{<EmptyMessage />}</div>}
              </div>
              <Message
                message={message}
                setMessage={setMessage}
                sendMessage={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
