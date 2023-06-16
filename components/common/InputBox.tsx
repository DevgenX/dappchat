"use client";

import { FC, useState, useEffect } from "react";
import { Icons } from "@/components/Icons";
import { useSearchParams } from "next/navigation";
import { useChatContext } from "@/context/DappChat.context";
import Loading from "@/components/common/Loading";

interface UserData {
  name: string;
  pubkey: string;
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
    pubkey: "",
  });

  const {
    getUserMessages,
    isLoading,
    input: content,
    setInput,
  } = useChatContext();

  const params = useSearchParams();

  useEffect(() => {
    if (!params) return;
    setUserData({
      name: params.get("name") || "",
      pubkey: params.get("pubkey") || " ",
    });
  }, [params]);

  useEffect(() => {
    if (userData.pubkey) {
      getUserMessages(userData.pubkey);
    }
  }, []);

  return (
    <>
      <div className="flex py-2 gap-2 relative my-4 mx-4">
        <input
          type="text"
          placeholder="Message..."
          className="bg-white flex-grow rounded-full outline-none p-2"
          value={content}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() =>
            sendMessage({ content: content, address: userData.pubkey })
          }
          className="absolute p-2 text-black mt-1 rounded-full right-1 hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? <Loading /> : <Icons.Send size={20} />}
        </button>
      </div>
    </>
  );
};
export default Input;
