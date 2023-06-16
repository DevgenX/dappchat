import { useChatContext } from "@/context/ChatDapp.context";
import MessageCard from "@/components/common/MessageCard";

const Messages = () => {
  const { messages } = useChatContext();

  return (
    <>
      {messages.map((message, index) => (
        <MessageCard key={index} message={message} />
      ))}
    </>
  );
};
export default Messages;
