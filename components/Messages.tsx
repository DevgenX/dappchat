import { useChatContext } from "@/context/ChatDapp.context";
import MessageCard from "./common/MessageCard";

const Messages = () => {
  const { messages, getUsername, account, username } = useChatContext();

  return (
    <div>
      {messages.map((message, index) => (
        <MessageCard key={index} message={message} />
      ))}
    </div>
  );
};
export default Messages;
