import { BsSendFill } from "react-icons/bs";
import { FC } from "react";
import { Icons } from "@/components/Icons";

interface MessageTypes {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: ({
    content,
    address,
  }: {
    content: string;
    address: string;
  }) => "" | Promise<void>;
}

const Message: FC<MessageTypes> = ({
  message: content,
  setMessage,
  sendMessage,
}) => {
  let address = "0123232";
  return (
    <>
      <div className="flex py-2 gap-2 relative my-4 mx-4">
        <input
          type="text"
          placeholder="Message..."
          className="bg-white flex-grow rounded-full outline-none p-2"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() => sendMessage({ content, address })}
          className="absolute p-2 text-black mt-1 rounded-full right-1 hover:scale-105"
        >
          <Icons.Send size={20} />
        </button>
      </div>
    </>
  );
};
export default Message;
