import { ethers, network } from "hardhat";
import * as Contracts from "../typechain-types";
import { Signer } from "ethers";
import {
  CHAINID,
  USDC_ADDRESS,
  NonfungiblePositionManager,
  SWAP_ROUTER_ADDRESS,
  AEVO_ADDRESS,
  AEVO_CONNECTOR_ADDRESS,
  USDCE_ADDRESS,
  WSTETH_ADDRESS,
  WETH_ADDRESS,
  AEVO_TRADER_ADDRESS,
  ARB_ADDRESS,
  ANGLE_REWARD_ADDRESS
} from "../constants";

const chainId: CHAINID = network.config.chainId ?? 0;

// assets
const usdcAddress = USDC_ADDRESS[chainId] ?? "";
const usdceAddress = USDCE_ADDRESS[chainId] ?? "";
const wstethAddress = WSTETH_ADDRESS[chainId] ?? "";
const wethAddress = WETH_ADDRESS[chainId] ?? "";
const arbAddress = ARB_ADDRESS[chainId] ?? "";
const nonfungiblePositionManager = NonfungiblePositionManager[chainId] ?? "";
const rewardAddress = ANGLE_REWARD_ADDRESS[chainId] ?? "";
const aevoAddress = AEVO_ADDRESS[chainId] ?? "";
const aevoConnectorAddress = AEVO_CONNECTOR_ADDRESS[chainId] ?? "";
let deployer: Signer;

const GAS_LIMIT = 100988531;

async function deployLiquidityContract() {
  const factory = await ethers.getContractFactory("CamelotLiquidity");
  const camelotLiquidityContract = (await factory.deploy(
    nonfungiblePositionManager,
    {
      gasLimit: GAS_LIMIT,
    }
  )) as Contracts.CamelotLiquidity;
  const camelotLiquidityAddress = await camelotLiquidityContract.getAddress();

  console.log(
    "Deployed Camelot LP contract at address %s",
    camelotLiquidityAddress
  );

  return camelotLiquidityAddress;
}

async function deployCamelotSwapContract() {
  // Deploy the Contract
  const swapRouterAddress = SWAP_ROUTER_ADDRESS[chainId] ?? "";
  console.log("SwapRouter %s", swapRouterAddress);

  const factory = await ethers.getContractFactory("CamelotSwap");
  const camelotSwapContract = await factory.deploy(swapRouterAddress, {
    gasLimit: GAS_LIMIT,
  });
  await camelotSwapContract.waitForDeployment();

  console.log(
    "Deployed Camelot Swap contract at address %s",
    await camelotSwapContract.getAddress()
  );

  return await camelotSwapContract.getAddress();
}

let aevoContract: Contracts.Aevo;

async function deployAevoContract() {
  const factory = await ethers.getContractFactory("Aevo");
  console.log(usdcAddress, aevoAddress, aevoConnectorAddress);

  aevoContract = await factory.deploy(
    usdcAddress,
    aevoAddress,
    aevoConnectorAddress
  );
  await aevoContract.waitForDeployment();

  console.log(
    "Deployed AEVO contract at address %s",
    await aevoContract.getAddress()
  );
  return await aevoContract.getAddress();
}

async function main() {
  [deployer] = await ethers.getSigners();
  console.log(
    "Deploying contracts with the account:",
    await deployer.getAddress()
  );

  // const camelotLiquidityAddress = await deployLiquidityContract();
  // const camelotSwapAddress = await deployCamelotSwapContract();
  // const aevoProxyAddress = await deployAevoContract();

  const camelotLiquidityAddress = "0x05AAe168AEB8516a068D9DED91F56f81C76706Eb";
  const camelotSwapAddress = "0x7EA2362e578212d7FDA082E0bBB5134f89EDc4DC";
  const aevoProxyAddress = "0xE1D5Bfe0665177986D3CAB8c27A19827570710eE";

  const RockOnyxUSDTVaultFactory = await ethers.getContractFactory(
    "RockOnyxUSDTVault"
  );
  const rockOnyxUSDTVault = await RockOnyxUSDTVaultFactory.deploy(
    usdcAddress,
    camelotLiquidityAddress,
    rewardAddress,
    nonfungiblePositionManager,
    camelotSwapAddress,
    aevoProxyAddress,
    AEVO_TRADER_ADDRESS[chainId] ?? "",
    usdceAddress,
    wethAddress,
    wstethAddress,
    arbAddress,
    BigInt(1.23363 * 1e6) 
  );

  console.log(
    "Deployed rockOnyxUSDTVault at address %s",
    await rockOnyxUSDTVault.getAddress()
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
