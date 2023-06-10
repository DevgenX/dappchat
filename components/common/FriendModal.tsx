"use client";

import { useState, FC, SetStateAction } from "react";
import { useChatContext } from "@/context/ChatDapp.context";
import Heading from "@/components/common/Heading";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FriendModal: FC<ModalProps> = ({ setIsModalOpen, isModalOpen }) => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const { handleAddFriend } = useChatContext();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-0">
      <div className="bg-gray-800 text-white rounded-lg p-6 sm:p-8 mx-4 sm:mx-auto w-full max-w-md">
        <Heading size="sm" className="text-2xl font-bold mb-4">
          Add Friends
        </Heading>
        <div className="mb-4">
          <label htmlFor="nickname" className="block font-medium">
            Nickname
          </label>
          <input
            type="text"
            id="nickname"
            className="w-full border-gray-300 dark:border-gray-600 outline-none py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="walletAddress" className="block font-medium">
            Wallet Address
          </label>
          <input
            type="text"
            id="walletAddress"
            className="w-full border-gray-300 dark:border-gray-600 outline-none py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md mr-2 hover:scale-105"
            onClick={() => setIsModalOpen((prev) => !prev)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-teal-600 dark:bg-blue-600 rounded-md hover:scale-105"
            onClick={() => handleAddFriend({ address, name })}
          >
            Add Friend
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendModal;