"use client";
import { useState, FC, SetStateAction } from "react";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import Heading from "@/components/common/Heading";

import { useChatContext } from "@/context/DappChat.context";

interface ModalProps {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FriendModal: FC<ModalProps> = ({ setIsModalOpen }) => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const { handleAddFriend, isLoading } = useChatContext();

  return (
    <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center bg-opacity-0">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-gray-800 rounded-lg p-6 sm:p-8 mx-4 sm:mx-auto w-full max-w-md">
          <Heading size="sm" className="text-2xl text-white font-bold mb-4">
            Add Friends
          </Heading>
          <div className="mb-4 text-white ">
            <label htmlFor="nickname" className="block font-medium">
              Nickname
            </label>
            <Input
              type="text"
              id="nickname"
              className="w-full text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6 text-white ">
            <label htmlFor="walletAddress" className="block font-medium">
              Wallet Address
            </label>
            <Input
              type="text"
              id="walletAddress"
              className="w-full text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md mr-2 hover:scale-105"
              onClick={() => setIsModalOpen((prev) => !prev)}
              label="Cancel"
            />

            <Button
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 dark:bg-blue-600 rounded-md hover:scale-105"
              onClick={() => handleAddFriend({ address, name })}
              label="Add Friend"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendModal;
