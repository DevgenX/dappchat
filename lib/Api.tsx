import Web3Modal from "web3modal";
import { Signer, ethers } from "ethers";
import BigNumber from "bignumber.js";
import detectEthereumProvider from "@metamask/detect-provider";

import { contractABI, contractAddress } from "@/lib/constants";
import { hardhatRPC, goerliRPC, mumbaiRPC, bscRPC } from "@/lib/constants";
import {
  hhContract,
  goerliContract,
  mumbaiContract,
  bscContract,
} from "@/lib/constants";

interface ContractTypes {
  eth: string;
  goerli: string;
  polygon: string;
  bsc: string;
  bsctest: string;
  hardhat: string;
  mumbai: string;
}

export const getCurrentRPC = async () => {
  let rpc;
  let hh = "0x7a69";
  let goerli = "0x5";
  let mm = "0x13881";
  let bsct = "0x61";
  const provider = (await detectEthereumProvider()) as any;

  if (!provider) return;
  const chainId = await provider.request({ method: "eth_chainId" });
  if (!chainId) return;

  if (chainId === hh) {
    rpc = hardhatRPC;
  } else if (chainId === goerli) {
    rpc = goerliRPC;
  } else if (chainId === mm) {
    rpc = mumbaiRPC;
  } else if (chainId === bsct) {
    rpc = bscRPC;
  }

  return rpc;
};

export const setSmartContract = async () => {
  let smartContract;
  let hh = "0x7a69";
  let goerli = "0x5";
  let mm = "0x13881";
  let bsct = "0x61";
  const provider = (await detectEthereumProvider()) as any;

  if (!provider) return;
  const chainId = await provider.request({ method: "eth_chainId" });
  if (!chainId) return;

  if (chainId === hh) {
    smartContract = hhContract;
  } else if (chainId === goerli) {
    smartContract = goerliContract;
  } else if (chainId === mm) {
    smartContract = mumbaiContract;
  } else if (chainId === bsct) {
    smartContract = bscContract;
  }

  return smartContract;
};

const contractAddresses: ContractTypes = {
  eth: "0xabced",
  goerli: "0xabcdef123456...",
  polygon: "0xabcdef123456...",
  bsc: "0xabcdef123456...",
  mumbai: "0xabcdef123456...",
  bsctest: "0xabcdef123456...",
  hardhat: "0xabc",
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
