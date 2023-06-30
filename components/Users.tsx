"use client";

import { useState } from "react";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import UsersCard from "@/components/ui/UsersCard";
import { useChatContext } from "@/context/DappChat.context";
import AccountModal from "@/components/ui/AccountModal";

const Users = () => {
  const { userList, currentUser } = useChatContext();
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <Heading size="lg">Meet and Add Friends</Heading>
        <Paragraph className="m-5 font-extralight text-black dark:text-white">
          Start chatting anonymously with users by adding them as friends
        </Paragraph>
        <hr className="w-1/2 h-0.5 mx-auto mt-3 bg-neutral-400 border-0 dark:bg-neutral-200 "></hr>
      </div>
      {currentUser ? (
        <div className="my-20 mx-10 grid grid-cols-1 md:grid-cols-3">
          {userList.map((arr, index) => (
            <UsersCard key={index} index={index} user={arr} />
          ))}
        </div>
      ) : (
        <>
          <div className="block text-center">
            <p className="m-5">Please create an account to view users</p>
            <button
              onClick={() => setOpenModal((prev) => !prev)}
              className="rounded-xl text-white font-bold p-3 bg-teal-600 dark:bg-blue-600 hover:scale-105"
            >
              CREATE ACCOUNT
            </button>
          </div>
          {openModal && <AccountModal setOpenModal={setOpenModal} />}
        </>
      )}
    </div>
  );
};
export default Users;
