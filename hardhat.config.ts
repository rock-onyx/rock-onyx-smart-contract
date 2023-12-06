import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/85cde589ce754dafa0a57001c326104d",
        blockNumber: 14448950,
      },
    },
  },
};

export default config;
