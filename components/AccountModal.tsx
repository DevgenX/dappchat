"use client";

import { useState, FC, SetStateAction } from "react";
import { useChatContext } from "@/context/ChatDapp.context";
import Heading from "@/components/Heading";

interface ModalProps {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

const AccountModal: FC<ModalProps> = ({ setOpenModal }) => {
  const [username, setUsername] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const { account } = useChatContext();

  const handleRegister = () => {
    // Perform registration logic here
    console.log("Registering user:", username, walletAddress);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-0">
      <div className="bg-gray-800 text-white rounded-lg p-6 sm:p-8 mx-4 sm:mx-auto w-full max-w-md">
        <Heading size="sm" className="text-2xl font-bold mb-4">
          Create Your Account
        </Heading>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full border-gray-300 dark:border-gray-600 outline-none py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="walletAddress" className="block font-medium">
            Wallet Address
          </label>
          <input
            type="text"
            id="walletAddress"
            className="w-full border-gray-300 text-slate-500 dark:border-gray-600 outline-none py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
            readOnly
            value={account}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md mr-2 hover:scale-105"
            onClick={() => setOpenModal((prev) => !prev)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-teal-600 dark:bg-blue-600 rounded-md hover:scale-105"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
