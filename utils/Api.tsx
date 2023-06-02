import Web3Modal from "web3modal";
import { toast } from "@/components/ui/Toast";
import { Signer, ethers } from "ethers";

import { contractABI, contractAddress } from "@/utils/constants";

export const CheckIsWalletConnected = async () => {
  try {
    if (!window.ethereum) {
      return toast({
        title: "Wallet is not connected",
        message: "Please connect your wallet",
        type: "error",
      });
    }

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
  } catch (e) {
    console.log(e);

    throw new Error("No ethereum account found");
  }
};

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

export const convertTime = (time: string | undefined) => {
  const newTime = new Date(Number(time));

  const convertedTime =
    newTime.getHours() +
    "/" +
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds() +
    " Date:" +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();

  return convertedTime;
};
