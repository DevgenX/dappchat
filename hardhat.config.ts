// https://eth-goerli.g.alchemy.com/v2/rAtfUcrWk0rx_lyWKqgdJa10XA9wQfry
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts: process.env.API_KEY !== undefined ? [process.env.API_KEY] : [],
    },
  },
};

export default config;
