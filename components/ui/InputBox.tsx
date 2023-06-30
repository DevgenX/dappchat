"use client";

import {
  FC,
  useState,
  useEffect,
  ChangeEvent,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useSearchParams } from "next/navigation";

import { Icons } from "@/components/Icons";
import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import { useChatContext } from "@/context/DappChat.context";
import Input from "@/components/common/Input";

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

const InputBox: FC<MessageTypes> = ({ sendMessage }) => {
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!params) return;
    setUserData({
      name: params.get("name") || "",
      friendkey: params.get("friendkey") || " ",
    });
  }, [params]);

  const handleInputChange = useCallback(() => {
    const searchValue = inputRef.current?.value || "";
    setInput(searchValue);
  }, [setInput]);

  useEffect(() => {
    if (userData.friendkey) {
      getUserMessages(userData.friendkey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const handleEnterKeyPress = () => {
    if (content && userData.friendkey) {
      sendMessage({ content, address: userData.friendkey });
    }
  };

  return (
    <>
      <div className="flex py-2 gap-2 relative my-4 mx-4">
        <Input
          type="text"
          ref={inputRef}
          name="message"
          placeholder="Message..."
          className="bg-white flex-grow rounded-full outline-none p-2"
          readOnly={currentUser ? false : true}
          onChange={handleInputChange}
          onEnter={handleEnterKeyPress}
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
export default InputBox;
