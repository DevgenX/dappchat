"use client";

import { FC, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Icons } from "@/components/Icons";
import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import { useChatContext } from "@/context/DappChat.context";

interface UserData {
  name: string;
  friendkey: string;
}

interface MessageTypes {
  sendMessage: ({
    content,
    address,
  }: {
    content: string;
    address: string;
  }) => "" | Promise<void>;
}

const Input: FC<MessageTypes> = ({ sendMessage }) => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    friendkey: "",
  });

  const {
    getUserMessages,
    isLoading,
    input: content,
    setInput,
    messages,
    currentUser,
  } = useChatContext();

  const params = useSearchParams();

  useEffect(() => {
    if (!params) return;
    setUserData({
      name: params.get("name") || "",
      friendkey: params.get("friendkey") || " ",
    });
  }, [params]);

  useEffect(() => {
    if (userData.friendkey) {
      getUserMessages(userData.friendkey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <>
      <div className="flex py-2 gap-2 relative my-4 mx-4">
        <input
          type="text"
          placeholder="Message..."
          className="bg-white flex-grow rounded-full outline-none p-2"
          value={content}
          readOnly={currentUser ? false : true}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          onClick={() =>
            sendMessage({ content: content, address: userData.friendkey })
          }
          className="absolute p-2 text-black mt-1 rounded-full right-1 hover:scale-105"
          disabled={isLoading}
          label={isLoading ? <Loading /> : <Icons.Send size={20} />}
        />
      </div>
    </>
  );
};
export default Input;
