import { useChatContext } from "@/context/DappChat.context";
import MessageCard from "@/components/common/MessageCard";

const Messages = () => {
  const { messages, getUserMessages, account } = useChatContext();

  return (
    <>
      {messages.map((message, index) => (
        <MessageCard key={index} message={message} />
      ))}
    </>
  );
};
export default Messages;
