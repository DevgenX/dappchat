import Web3Modal from "web3modal";
import { Signer, ethers } from "ethers";
import BigNumber from "bignumber.js";
import detectEthereumProvider from "@metamask/detect-provider";

import { contractABI } from "@/lib/constants";

import { toast } from "@/components/common/Toast";
import {
  hhContract,
  goerliContract,
  mumbaiContract,
  bscContract,
  bnbContract,
  polygonContract,
  sepoliaContract,
} from "@/lib/constants";

let contractAdd: string;

export const getCurrentChain = async () => {
  let chain;
  let hh = "0x7a69";
  let goerli = "0x5";
  let mm = "0x13881";
  let bsct = "0x61";
  let bnb = "0x38";
  let eth = "0x1";
  let polygon = "0x89";
  let ftm = "0xfa";
  let avalanche = "0xa86a";
  let sepolia = "0xaa36a7";

  const provider = (await detectEthereumProvider()) as any;
  if (!provider) return;
  const chainId = await provider.request({ method: "eth_chainId" });
  if (!chainId) return;

  if (chainId === hh) {
    chain = "Hardhat";
  } else if (chainId === goerli) {
    chain = "Goerli";
  } else if (chainId === mm) {
    chain = "Mumbai";
  } else if (chainId === bsct) {
    chain = "BSC Testnet";
  } else if (chainId === bnb) {
    chain = "BSC";
  } else if (chainId === eth) {
    chain = "Ethereum";
  } else if (chainId === polygon) {
    chain = "Polygon";
  } else if (chainId === ftm) {
    chain = "Fantom";
  } else if (chainId === avalanche) {
    chain = "Avalanche";
  } else if (chainId === sepolia) {
    chain = "Sepolia";
  }
  return chain;
};

export const setSmartContract = async (): Promise<string> => {
  let hh = "0x7a69";
  let goerli = "0x5";
  let mm = "0x13881";
  let bsct = "0x61";
  let bnb = "0x38";
  let polygon = "0x89";
  let sepolia = "0xaa36a7";

  const provider = (await detectEthereumProvider()) as any;

  if (!provider) {
    toast({
      title: "Metamask Error",
      message: "Please install metamask",
      type: "error",
    });
  }
  const chainId = await provider.request({ method: "eth_chainId" });
  if (!chainId) {
    toast({
      title: "Network Error",
      message: "Please change your network",
      type: "error",
    });
  }

  if (chainId === hh) {
    contractAdd = hhContract;
  } else if (chainId === goerli) {
    contractAdd = goerliContract;
  } else if (chainId === mm) {
    contractAdd = mumbaiContract;
  } else if (chainId === bsct) {
    contractAdd = bscContract;
  } else if (chainId === bnb) {
    contractAdd = bnbContract;
  } else if (chainId === polygon) {
    contractAdd = polygonContract;
  } else if (chainId === sepolia) {
    contractAdd = sepoliaContract;
  }
  return contractAdd;
};

export const fetchContract = async (signer: Signer) => {
  const multiChainContract = await setSmartContract();
  return new ethers.Contract(multiChainContract, contractABI, signer);
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
