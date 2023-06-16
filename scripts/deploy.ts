import { ethers } from "hardhat";

const main = async () => {
  const DappChat = await ethers.getContractFactory("DappChat");
  const dappChat = await DappChat.deploy();

  await dappChat.deployed();

  console.log(`Contract address is to ${dappChat.address}`);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runMain();
