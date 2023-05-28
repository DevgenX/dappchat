import { ethers } from "hardhat";

const main = async () => {
  const ChatDapp = await ethers.getContractFactory("ChatDapp");
  const chatDapp = await ChatDapp.deploy();

  await chatDapp.deployed();

  console.log(`Contract address is to ${chatDapp.address}`);
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
