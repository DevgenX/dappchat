import Web3Modal from "web3modal";
import { Signer, ethers } from "ethers";
import BigNumber from "bignumber.js";

import { contractABI, contractAddress } from "@/lib/constants";

export const fetchContract = (signer: Signer) => {
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const connectToSmartContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    return contract;
  } catch (e) {
    throw new Error("No ethereum object");
  }
};

export const formattedTime = (time: string | number | BigNumber) => {
  const timestamp = new BigNumber(time);

  if (timestamp.isNaN()) {
    return undefined;
  }

  const date = timestamp.toNumber() * 1000;

  const newTime = new Date(date);

  const today = new Date();

  const formattedDate = newTime.toLocaleDateString();
  const formattedTime = newTime.toLocaleTimeString().slice(0, -6);

  if (today.toLocaleDateString() === formattedDate) {
    return `Today, ${formattedTime} ${newTime.getHours() >= 12 ? "PM" : "AM"}`;
  } else {
    return `${formattedDate}, ${formattedTime} ${
      newTime.getHours() >= 12 ? "PM" : "AM"
    }`;
  }
};
