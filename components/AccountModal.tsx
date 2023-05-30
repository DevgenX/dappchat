"use client";

import { useState } from "react";

const AccountModal = () => {
  const [username, setUsername] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const handleRegister = () => {
    // Perform registration logic here
    console.log("Registering user:", username, walletAddress);
  };

  const handleClose = () => {
    console.log("Closing user:", username, walletAddress);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 mx-4 sm:mx-auto w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register Account</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
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
            className="w-full border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md mr-2"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
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
