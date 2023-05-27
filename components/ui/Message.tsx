import { BsSendFill } from "react-icons/bs";

const Message = () => {
  return (
    <>
      <div className="flex py-2 gap-2 relative my-4 mx-4">
        <input
          type="text"
          placeholder="Message..."
          className="bg-white flex-grow rounded-full outline-none p-2"
        />
        <button className="absolute bg-blue-500 p-2 text-white mt-1 rounded-full right-1">
          <BsSendFill />
        </button>
      </div>
    </>
  );
};
export default Message;
