"use client";

import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Heading";
import UsersCard from "./common/UsersCard";
import { useChatContext } from "@/context/ChatDapp.context";

const Users = () => {
  const { userList } = useChatContext();

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center">
        <Heading size="lg">Meet and Add Friends</Heading>
        <Paragraph size="sm" className="m-5 font-extralight">
          Start chatting anonymously with users by adding them as friends
        </Paragraph>
        <hr className="w-1/2 h-0.5 mx-auto mt-3 bg-neutral-400 border-0 dark:bg-neutral-200 "></hr>
      </div>
      <div className="my-20 mx-10 grid grid-cols-1 md:grid-cols-3">
        {userList.map((arr, index) => (
          <UsersCard key={index} index={index} user={arr} />
        ))}
      </div>
    </div>
  );
};
export default Users;
