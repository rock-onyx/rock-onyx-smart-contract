const { ethers, network } = require("hardhat");
import { expect } from "chai";
import axios from "axios";

import * as Contracts from "../../typechain-types";
import {
  CHAINID,
  WETH_ADDRESS,
  USDC_ADDRESS,
  USDCE_ADDRESS,
  WSTETH_ADDRESS,
  ARB_ADDRESS,
  NonfungiblePositionManager,
  SWAP_ROUTER_ADDRESS,
  AEVO_ADDRESS,
  AEVO_CONNECTOR_ADDRESS,
  USDC_IMPERSONATED_SIGNER_ADDRESS,
  USDCE_IMPERSONATED_SIGNER_ADDRESS,
  NFT_POSITION_ADDRESS,
  ANGLE_REWARD_ADDRESS
} from "../../constants";
import {
  Signer,
  BigNumberish,
  ContractTransaction,
  AbiCoder,
  ContractTransactionReceipt,
} from "ethers";

// const chainId: CHAINID = network.config.chainId;
const chainId: CHAINID = 42161;

describe("RockOnyxStableCoinVault", function () {
  let admin: Signer,
    user1: Signer,
    user2: Signer,
    user3: Signer,
    user4: Signer,
    user5: Signer;

  let optionsReceiver: Signer;

  let camelotLiquidityContract: Contracts.CamelotLiquidity;
  let rockOnyxUSDTVaultContract: Contracts.RockOnyxUSDTVault;

  let onchainCamelotLiquidityContract: Contracts.CamelotLiquidity;
  let onchainRockOnyxUSDTVaultContract: Contracts.RockOnyxUSDTVault;
  let usdc: Contracts.IERC20;
  let usdce: Contracts.IERC20;
  let wsteth: Contracts.IERC20;
  let weth: Contracts.IERC20;
  let arb: Contracts.IERC20;
  let nftPosition: Contracts.IERC721;
  let reward: Contracts.IRewardVendor;
  let liquidityTokenId: number;
  let liquidityAmount: number;

  const LIQUIDITY_TOKEN_ID_INDEX = 0;
  const LIQUIDITY_AMOUNT_INDEX = 1;
  const PRECISION = 2 * 1e6;

  let aevoContract: Contracts.Aevo;

  const nftPositionAddress = NFT_POSITION_ADDRESS[chainId];
  const rewardAddress = ANGLE_REWARD_ADDRESS[chainId];
  const usdcImpersonatedSigner = USDC_IMPERSONATED_SIGNER_ADDRESS[chainId];
  const usdceImpersonatedSigner = USDCE_IMPERSONATED_SIGNER_ADDRESS[chainId];
  const nonfungiblePositionManager = NonfungiblePositionManager[chainId];
  const usdcAddress = USDC_ADDRESS[chainId];
  const usdceAddress = USDCE_ADDRESS[chainId];
  const wstethAddress = WSTETH_ADDRESS[chainId];
  const wethAddress = WETH_ADDRESS[chainId];
  const arbAddress = ARB_ADDRESS[chainId];
  const swapRouterAddress = SWAP_ROUTER_ADDRESS[chainId];
  const aevoAddress = AEVO_ADDRESS[chainId];
  const aevoConnectorAddress = AEVO_CONNECTOR_ADDRESS[chainId];

  let camelotSwapContract: Contracts.CamelotSwap;

  async function deployCamelotLiquidity() {
    const camelotLiquidity = await ethers.getContractFactory("CamelotLiquidity");
    camelotLiquidityContract = await camelotLiquidity.deploy(
      nonfungiblePositionManager
    );
    await camelotLiquidityContract.waitForDeployment();

    console.log(
      "deploy CamelotLiquidity successfully: %s",
      await camelotLiquidityContract.getAddress()
    );
  }

  async function deployCamelotSwapContract() {
    const factory = await ethers.getContractFactory("CamelotSwap");
    camelotSwapContract = await factory.deploy(swapRouterAddress);
    await camelotSwapContract.waitForDeployment();

    console.log(
      "Deployed Camelot Swap contract at address %s",
      await camelotSwapContract.getAddress()
    );
  }

  async function deployAevoContract() {
    const factory = await ethers.getContractFactory("Aevo");
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
  }

  async function deployRockOnyxUSDTVault() {
    const rockOnyxUSDTVault = await ethers.getContractFactory(
      "RockOnyxUSDTVault"
    );

    rockOnyxUSDTVaultContract = await rockOnyxUSDTVault.deploy(
      usdcAddress,
      await camelotLiquidityContract.getAddress(),
      rewardAddress,
      nftPositionAddress,
      await camelotSwapContract.getAddress(),
      await aevoContract.getAddress(),
      await optionsReceiver.getAddress(),
      usdceAddress,
      wethAddress,
      wstethAddress,
      arbAddress
    );
    await rockOnyxUSDTVaultContract.waitForDeployment();

    console.log(
      "deploy rockOnyxEthLiquidityStrategyContract successfully: %s",
      await rockOnyxUSDTVaultContract.getAddress()
    );
  }

  async function getMintPositionResult(
    tx: ContractTransactionReceipt,
    index: number
  ) {
    var log = tx?.logs.find((l) =>
      l.topics.includes(
        "0x38296fd5286ebdb66bc9ab8003152f9666c9e808b447df47c94f7d2387fb3a54"
      )
    );
    return AbiCoder.defaultAbiCoder().decode(
      ["uint256", "uint128", "uint256", "uint256"],
      log!.data
    )[index];
  }

  async function getIncreasePositionResult(
    tx: ContractTransactionReceipt,
    index: number
  ) {
    var log = tx?.logs.find((l) =>
      l.topics.includes(
        "0x0a65cc63f481035bddeace027bb12726628d84152598e98e29635cbcbb0bfa76"
      )
    );
    return AbiCoder.defaultAbiCoder().decode(
      ["uint256", "uint128", "uint256", "uint256"],
      log!.data
    )[index];
  }

  beforeEach(async function () {
    [admin, optionsReceiver, user1, user2, user3, user4] = await ethers.getSigners();

    nftPosition = await ethers.getContractAt("IERC721", nftPositionAddress);
    usdc = await ethers.getContractAt("IERC20", usdcAddress);
    usdce = await ethers.getContractAt("IERC20", usdceAddress);

    wsteth = await ethers.getContractAt("IERC20", wstethAddress);
    weth = await ethers.getContractAt("IERC20", wethAddress);
    arb = await ethers.getContractAt("IERC20", arbAddress);
    await deployCamelotLiquidity();
    await deployCamelotSwapContract();
    await deployAevoContract();
    await deployRockOnyxUSDTVault();
  });

  // Helper function for deposit
  async function deposit(sender: Signer, amount: BigNumberish) {
    await usdc
      .connect(sender)
      .approve(await rockOnyxUSDTVaultContract.getAddress(), amount);

    await rockOnyxUSDTVaultContract.connect(sender).deposit(amount);
  }

  async function transferUsdcForUser(
    from: Signer,
    to: Signer,
    amount: number
  ) {
    const transferTx = await usdc
      .connect(from)
      .transfer(to, amount);
    await transferTx.wait();
  }

  async function logAndReturnTotalValueLock() {
    const totalValueLocked = await rockOnyxUSDTVaultContract
      .connect(admin)
      .totalValueLocked();

    console.log("totalValueLocked %s", totalValueLocked);

    return totalValueLocked;
  }

  it("seed data", async function () {
    const usdcSigner = await ethers.getImpersonatedSigner(usdcImpersonatedSigner);
    const usdceSigner = await ethers.getImpersonatedSigner(usdceImpersonatedSigner);

    await transferUsdcForUser(usdcSigner, user1, 1000 * 1e6);
    await transferUsdcForUser(usdcSigner, user2, 1000 * 1e6);
    await transferUsdcForUser(usdcSigner, user3, 1000 * 1e6);
    await transferUsdcForUser(usdcSigner, user4, 1000 * 1e6);

    await transferUsdcForUser(usdceSigner, optionsReceiver, 1000 * 1e6);
  });

  it.skip("deposit to rockOnyxUSDTVault, WETH in pending amount, should handle acquireWithdrawalFunds correctly", async function () {
    console.log('-------------deposit to rockOnyxUSDTVault---------------');
    await deposit(user1, 10 * 1e6);
    await deposit(user2, 100 * 1e6);

    let totalValueLock = await logAndReturnTotalValueLock();
    expect(totalValueLock).to.approximately(110 * 1e6, PRECISION);

    console.log('-------------mintEthLP position on Camelot---------------');
    const mintEthLPPositionTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .mintEthLPPosition(2000, 2101, 5000, 4);
    await mintEthLPPositionTx.wait();

    totalValueLock = await logAndReturnTotalValueLock();
    expect(totalValueLock).to.approximately(110 * 1e6, PRECISION);

    console.log('-------------Users initial withdrawals---------------');
    const initiateWithdrawalTx1 = await rockOnyxUSDTVaultContract
      .connect(user2)
      .initiateWithdrawal(100*1e6);
    await initiateWithdrawalTx1.wait();

    console.log('-------------close round---------------');
    const closeRoundTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .closeRound();
    await closeRoundTx.wait();

    totalValueLock = await logAndReturnTotalValueLock();
    expect(totalValueLock).to.approximately(110 * 1e6, PRECISION);

    console.log('-------------accquire withdrawal funds for the round---------------');
    const acquireWithdrawalFundsTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .acquireWithdrawalFunds();
    await acquireWithdrawalFundsTx.wait();

    totalValueLock = await logAndReturnTotalValueLock();
    expect(totalValueLock).to.approximately(10*1e6, PRECISION);

    console.log('-------------complete withdrawals---------------');
    let user2Balance = await usdc.connect(user2).balanceOf(user2);
    console.log("usdc of user before withdraw %s", user2Balance);

    const completeWithdrawalTx = await rockOnyxUSDTVaultContract
      .connect(user2)
      .completeWithdrawal(100*1e6);
    await completeWithdrawalTx.wait();

    let user1BalanceAfterWithdraw = await usdc.connect(user2).balanceOf(user2);
    console.log("usdc of user after withdraw %s", user1BalanceAfterWithdraw);
    expect(user1BalanceAfterWithdraw).to.approximately(user2Balance + BigInt(100*1e6), PRECISION);
  });

  it.skip("deposit to rockOnyxUSDTVault, wstETH in pending amount, should handle acquireWithdrawalFunds correctly", async function () {
    console.log('-------------deposit to rockOnyxUSDTVault---------------');
    await deposit(user1, 10 * 1e6);
    await deposit(user2, 100 * 1e6);

    let totalValueLock = await logAndReturnTotalValueLock();
    expect(totalValueLock).to.approximately(110 * 1e6, PRECISION);

    console.log('-------------mintEthLP position on Camelot---------------');
    const mintEthLPPositionTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .mintEthLPPosition(1442, 1445, 5000, 4);
    await mintEthLPPositionTx.wait();

    let wstEthBalance = await wsteth.balanceOf(await rockOnyxUSDTVaultContract.getAddress());
    console.log("Vault wstETH amount after mint %s", ethers.formatUnits(wstEthBalance, 18));

    console.log('-------------Users initial withdrawals---------------');
    const initiateWithdrawalTx1 = await rockOnyxUSDTVaultContract
      .connect(user2)
      .initiateWithdrawal(100*1e6);
    await initiateWithdrawalTx1.wait();

    console.log('-------------close round---------------');
    const closeRoundTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .closeRound();
    await closeRoundTx.wait();

    console.log('-------------accquire withdrawal funds for the round---------------');
    const acquireWithdrawalFundsTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .acquireWithdrawalFunds();
    await acquireWithdrawalFundsTx.wait();

    let totalValueLock2 = await logAndReturnTotalValueLock();
    expect(totalValueLock2).to.approximately(8.5*1e6, PRECISION);

    console.log('-------------complete withdrawals---------------');
    let user2Balance = await usdc.connect(user2).balanceOf(user2);
    console.log("usdc of user before withdraw %s", user2Balance);
    const completeWithdrawalTx = await rockOnyxUSDTVaultContract
      .connect(user2)
      .completeWithdrawal(100*1e6);
    await completeWithdrawalTx.wait();

    let user1BalanceAfterWithdraw = await usdc.connect(user2).balanceOf(user2);
    console.log("usdc of user after withdraw %s", user1BalanceAfterWithdraw);
    expect(user1BalanceAfterWithdraw).to.approximately(user2Balance + BigInt(100*1e6), PRECISION);
  });

  it.skip("deposit to rockOnyxUSDTVault, USDC in pending amount, should handle acquireWithdrawalFunds correctly", async function () {
    console.log('-------------deposit to rockOnyxUSDTVault---------------');
    await deposit(user1, 10 * 1e6);
    await deposit(user2, 100 * 1e6);

    let totalValueLock = await logAndReturnTotalValueLock();
    expect(totalValueLock).to.approximately(110 * 1e6, PRECISION);

    console.log('-------------mintUsdLP position on Camelot---------------');
    const mintUsdLPPositionTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .mintUsdLPPosition(-2, 2, 3000, 4);
    const mintUsdLPPositionTxResult = await mintUsdLPPositionTx.wait();

    let usdcBalance = await usdc.balanceOf(await rockOnyxUSDTVaultContract.getAddress());
    console.log("Vault usdce amount after mint %s", ethers.formatUnits(usdcBalance, 6));

    console.log('-------------Users initial withdrawals---------------');
    const initiateWithdrawalTx1 = await rockOnyxUSDTVaultContract
      .connect(user2)
      .initiateWithdrawal(100*1e6);
    await initiateWithdrawalTx1.wait();

    console.log('-------------close round---------------');
    const closeRoundTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .closeRound();
    await closeRoundTx.wait();

    console.log('-------------accquire withdrawal funds for the round---------------');
    const acquireWithdrawalFundsTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .acquireWithdrawalFunds();
    await acquireWithdrawalFundsTx.wait();

    let totalValueLock2 = await logAndReturnTotalValueLock();
    expect(totalValueLock2).to.approximately(10*1e6, PRECISION);

    console.log('-------------complete withdrawals---------------');
    let user2Balance = await usdc.connect(user2).balanceOf(user2);
    console.log("usdc of user before withdraw %s", user2Balance);

    const completeWithdrawalTx = await rockOnyxUSDTVaultContract
      .connect(user2)
      .completeWithdrawal(100*1e6);
    await completeWithdrawalTx.wait();

    let user1BalanceAfterWithdraw = await usdc.connect(user2).balanceOf(user2);
    console.log("usdc of user after withdraw %s", user1BalanceAfterWithdraw);
    expect(user1BalanceAfterWithdraw).to.approximately(user2Balance + BigInt(100*1e6), PRECISION);
  });

  it.skip("calculate performance fee rockOnyxUSDTVault, USDC in pending amount, should handle acquireWithdrawalFunds correctly", async function () {
    console.log('-------------calculate performance fee rockOnyxUSDTVault---------------');
    await deposit(user2, 100 * 1e6);

    console.log('-------------mintUsdLP position on Camelot---------------');
    const mintUsdLPPositionTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .mintUsdLPPosition(-2, 2, 3000, 4);
    const mintUsdLPPositionTxResult = await mintUsdLPPositionTx.wait();

    console.log('-------------deposit to vendor on aevo---------------');
    await rockOnyxUSDTVaultContract.connect(admin).depositToVendor({
      value: ethers.parseEther("0.000159539385325246"),
    });

    console.log('-------------Users initial withdrawals---------------');
    const initiateWithdrawalTx1 = await rockOnyxUSDTVaultContract
      .connect(user2)
      .initiateWithdrawal(100 * 1e6);
    await initiateWithdrawalTx1.wait();

    console.log('-------------update allocated balance from aevo vendor---------------');
    const updateProfitTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .updateProfitFromVender(30*1e6);
    await updateProfitTx.wait();

    console.log('-------------close round---------------');
    const closeRoundTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .closeRound();
    await closeRoundTx.wait();

    const getAllocatedRatio = await rockOnyxUSDTVaultContract
    .connect(admin)
    .allocatedRatio();
    console.log("getAllocatedRatio = %s", getAllocatedRatio);

    const roundWdAmount = await rockOnyxUSDTVaultContract
      .connect(admin)
      .getRoundWithdrawAmount();

    console.log("roundWdAmount = %s", roundWdAmount);
    let usdcAmount = roundWdAmount * getAllocatedRatio[2] / BigInt(1e4);
    console.log("usdcAmount %s", usdcAmount);

    await usdc
      .connect(optionsReceiver)
      .approve(await rockOnyxUSDTVaultContract.getAddress(), usdcAmount);

    await rockOnyxUSDTVaultContract
      .connect(optionsReceiver)
      .handlePostWithdrawalFromVendor(usdcAmount);

    console.log('-------------accquire withdrawal funds for the round---------------');
    const acquireWithdrawalFundsTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .acquireWithdrawalFunds();
    await acquireWithdrawalFundsTx.wait();

    console.log('-------------complete withdrawals---------------');
    let user2Balance = await usdc.connect(user2).balanceOf(user2);

    const completeWithdrawalTx = await rockOnyxUSDTVaultContract
      .connect(user2)
      .completeWithdrawal(100*1e6);
    await completeWithdrawalTx.wait();

    console.log('------------- Claim all fees ---------------');
    const claimTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .claimFee();
    await completeWithdrawalTx.wait();
  });
  
  it("Full flow with multiple users deposit and withdraw all money", async function () {
    console.log('-------------calculate performance fee rockOnyxUSDTVault---------------');
    await deposit(user1, 200 * 1e6);
    await deposit(user2, 100 * 1e6);

    console.log('-------------mintUsdLP position on Camelot---------------');
    const mintUsdLPPositionTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .mintUsdLPPosition(-2, 2, 3000, 4);
    const mintUsdLPPositionTxResult = await mintUsdLPPositionTx.wait();

    console.log('-------------deposit to vendor on aevo---------------');
    await rockOnyxUSDTVaultContract.connect(admin).depositToVendor({
      value: ethers.parseEther("0.000159539385325246"),
    });

    let usdcBalance = await usdc.balanceOf(await rockOnyxUSDTVaultContract.getAddress());
    console.log("Vault usdc amount after mint %s", ethers.formatUnits(usdcBalance, 6));
    let withdrawShares = 100 * 1e6;
    console.log('-------------Users initial withdrawals---------------');
    // user 1 initates withdrawal
    const initiateWithdrawalTx1 = await rockOnyxUSDTVaultContract
      .connect(user2)
      .initiateWithdrawal(withdrawShares);
    await initiateWithdrawalTx1.wait();

    // user 2 initates withdrawal
    const initiateWithdrawalTx2 = await rockOnyxUSDTVaultContract
      .connect(user1)
      .initiateWithdrawal(200 * 1e6);
    await initiateWithdrawalTx2.wait();

    console.log('-------------update allocated balance from aevo vendor---------------');
    const updateProfitTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .updateProfitFromVender(90*1e6);
    await updateProfitTx.wait();

    console.log('-------------close round---------------');
    const closeRoundTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .closeRound();
    await closeRoundTx.wait();

    const getAllocatedRatio = await rockOnyxUSDTVaultContract
      .connect(admin)
      .allocatedRatio();
    console.log("getAllocatedRatio = %s", getAllocatedRatio);
    
    const roundWdAmount = await rockOnyxUSDTVaultContract
      .connect(admin)
      .getRoundWithdrawAmount();

    console.log("roundWdAmount = %s", roundWdAmount);
    let usdcAmount = roundWdAmount * getAllocatedRatio[2] / BigInt(1e4);
    console.log("usdceAmount %s", usdcAmount);

    await usdc
      .connect(optionsReceiver)
      .approve(await rockOnyxUSDTVaultContract.getAddress(), usdcAmount);

    await rockOnyxUSDTVaultContract
      .connect(optionsReceiver)
      .handlePostWithdrawalFromVendor(usdcAmount);

    console.log('-------------accquire withdrawal funds for the round---------------');
    const acquireWithdrawalFundsTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .acquireWithdrawalFunds();
    await acquireWithdrawalFundsTx.wait();

    console.log('-------------complete withdrawals---------------');
    // let user2Balance = await usdc.connect(user2).balanceOf(user2);

    const completeWithdrawalTx = await rockOnyxUSDTVaultContract
      .connect(user2)
      .completeWithdrawal(100*1e6);
    await completeWithdrawalTx.wait();

    const completeWithdrawalTx2 = await rockOnyxUSDTVaultContract
      .connect(user1)
      .completeWithdrawal(200*1e6);
    await completeWithdrawalTx2.wait();

    console.log('------------- Claim all fees ---------------');
    const claimTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .claimFee();
    await completeWithdrawalTx.wait();
  });

  it("Full flow with multiple users deposit and withdraw all money in losses", async function () {
    console.log('-------------calculate performance fee rockOnyxUSDTVault---------------');
    await deposit(user1, 200 * 1e6);
    await deposit(user2, 100 * 1e6);

    console.log('-------------mintUsdLP position on Camelot---------------');
    const mintUsdLPPositionTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .mintUsdLPPosition(-2, 2, 3000, 4);
    const mintUsdLPPositionTxResult = await mintUsdLPPositionTx.wait();

    console.log('-------------deposit to vendor on aevo---------------');
    await rockOnyxUSDTVaultContract.connect(admin).depositToVendor({
      value: ethers.parseEther("0.000159539385325246"),
    });

    let usdcBalance = await usdc.balanceOf(await rockOnyxUSDTVaultContract.getAddress());
    console.log("Vault usdc amount after mint %s", ethers.formatUnits(usdcBalance, 6));
    let withdrawShares = 100 * 1e6;
    console.log('-------------Users initial withdrawals---------------');
    // user 1 initates withdrawal
    const initiateWithdrawalTx1 = await rockOnyxUSDTVaultContract
      .connect(user2)
      .initiateWithdrawal(withdrawShares);
    await initiateWithdrawalTx1.wait();

    // user 2 initates withdrawal
    const initiateWithdrawalTx2 = await rockOnyxUSDTVaultContract
      .connect(user1)
      .initiateWithdrawal(200 * 1e6);
    await initiateWithdrawalTx2.wait();

    console.log('-------------update allocated balance from aevo vendor---------------');
    const updateProfitTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .updateProfitFromVender(40*1e6);
    await updateProfitTx.wait();

    console.log('-------------close round---------------');
    const closeRoundTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .closeRound();
    await closeRoundTx.wait();

    const getAllocatedRatio = await rockOnyxUSDTVaultContract
      .connect(admin)
      .allocatedRatio();
    console.log("getAllocatedRatio = %s", getAllocatedRatio);
    
    const roundWdAmount = await rockOnyxUSDTVaultContract
      .connect(admin)
      .getRoundWithdrawAmount();

    console.log("roundWdAmount = %s", roundWdAmount);
    let usdcAmount = roundWdAmount * getAllocatedRatio[2] / BigInt(1e4);
    console.log("usdcAmount %s", usdcAmount);

    await usdc
      .connect(optionsReceiver)
      .approve(await rockOnyxUSDTVaultContract.getAddress(), usdcAmount);

    await rockOnyxUSDTVaultContract
      .connect(optionsReceiver)
      .handlePostWithdrawalFromVendor(usdcAmount);

    console.log('-------------accquire withdrawal funds for the round---------------');
    const acquireWithdrawalFundsTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .acquireWithdrawalFunds();
    await acquireWithdrawalFundsTx.wait();

    console.log('-------------complete withdrawals---------------');
    // let user2Balance = await usdc.connect(user2).balanceOf(user2);

    const completeWithdrawalTx = await rockOnyxUSDTVaultContract
      .connect(user2)
      .completeWithdrawal(100*1e6);
    await completeWithdrawalTx.wait();

    const completeWithdrawalTx2 = await rockOnyxUSDTVaultContract
      .connect(user1)
      .completeWithdrawal(200*1e6);
    await completeWithdrawalTx2.wait();

    console.log('------------- Claim all fees ---------------');
    const claimTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .claimFee();
    await completeWithdrawalTx.wait();
  });

  it("user deposit -> close round -> depoist -> init withdraw -> close round -> close round -> completed withdraw", async function () {
    console.log('-------------calculate performance fee rockOnyxUSDTVault---------------');

    console.log('-------------deposit time 1: 50$---------------');
    await deposit(user1, 50 * 1e6);

    console.log('-------------close round time 1---------------');
    const closeRound1Tx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .closeRound();
    await closeRound1Tx.wait();

    console.log('-------------deposit time 2: 5$---------------');
    await deposit(user1, 5 * 1e6);

    console.log('-------------initial withdrawals time 1: 5$---------------');
    const initiateWithdrawal1Tx = await rockOnyxUSDTVaultContract
      .connect(user1)
      .initiateWithdrawal(5 *1e6);
    await initiateWithdrawal1Tx.wait();

    console.log('-------------close round time 2---------------');
    const closeRound2Tx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .closeRound();
    await closeRound2Tx.wait();

    console.log('-------------accquire withdrawal funds for the round---------------');
    const acquireWithdrawalFundsTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .acquireWithdrawalFunds();
    await acquireWithdrawalFundsTx.wait();

    console.log('-------------close round time 3---------------');
    const closeRound3Tx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .closeRound();
    await closeRound2Tx.wait();

    console.log('-------------complete withdrawals 1---------------');
    const completeWithdrawalTx = await rockOnyxUSDTVaultContract
      .connect(user1)
      .completeWithdrawal(5*1e6);
    await completeWithdrawalTx.wait();

    let pps = await rockOnyxUSDTVaultContract
    .connect(admin)
    .pricePerShare();
    console.log("pricePerShare", pps);
  });

  it("user deposit -> close round -> depoist -> init withdraw -> close round -> close round -> completed withdraw -> deposit", async function () {
    console.log('-------------calculate performance fee rockOnyxUSDTVault---------------');

    console.log('-------------deposit time 1: 50$---------------');
    await deposit(user1, 50 * 1e6);

    console.log('-------------close round time 1---------------');
    const closeRound1Tx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .closeRound();
    await closeRound1Tx.wait();

    console.log('-------------deposit time 2: 5$---------------');
    await deposit(user1, 5 * 1e6);

    console.log('-------------deposit to vendor on aevo---------------');
    await rockOnyxUSDTVaultContract.connect(admin).depositToVendor({
      value: ethers.parseEther("0.000159539385325246"),
    });

    console.log('-------------initial withdrawals time 1: 5$---------------');
    const initiateWithdrawal1Tx = await rockOnyxUSDTVaultContract
      .connect(user1)
      .initiateWithdrawal(5 *1e6);
    await initiateWithdrawal1Tx.wait();

    console.log('-------------initial withdrawals time 2: 5$---------------');
    const initiateWithdrawal2Tx = await rockOnyxUSDTVaultContract
      .connect(user1)
      .initiateWithdrawal(5 *1e6);
    await initiateWithdrawal2Tx.wait();

    console.log('-------------update allocated balance from aevo vendor---------------');
    const updateProfitTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .updateProfitFromVender(30*1e6);
    await updateProfitTx.wait();

    console.log('-------------close round time 2---------------');
    const closeRound2Tx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .closeRound();
    await closeRound2Tx.wait();

    const getAllocatedRatio = await rockOnyxUSDTVaultContract
    .connect(admin)
    .allocatedRatio();
    console.log("getAllocatedRatio = %s", getAllocatedRatio);

    const roundWdAmount = await rockOnyxUSDTVaultContract
    .connect(admin)
    .getRoundWithdrawAmount();

  console.log("roundWdAmount = %s", roundWdAmount);
  let usdcAmount = roundWdAmount * getAllocatedRatio[2] / BigInt(1e4);
  console.log("usdceAmount %s", usdcAmount);

  await usdc
    .connect(optionsReceiver)
    .approve(await rockOnyxUSDTVaultContract.getAddress(), usdcAmount);

  await rockOnyxUSDTVaultContract
    .connect(optionsReceiver)
    .handlePostWithdrawalFromVendor(usdcAmount);

    console.log('-------------accquire withdrawal funds for the round---------------');
    const acquireWithdrawalFundsTx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .acquireWithdrawalFunds();
    await acquireWithdrawalFundsTx.wait();

    console.log('-------------close round time 3---------------');
    const closeRound3Tx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .closeRound();
    await closeRound3Tx.wait();

    console.log('-------------complete withdrawals 1---------------');
    const completeWithdrawalTx = await rockOnyxUSDTVaultContract
      .connect(user1)
      .completeWithdrawal(5*1e6);
    await completeWithdrawalTx.wait();

    let pps = await rockOnyxUSDTVaultContract
    .connect(admin)
    .pricePerShare();
    console.log("pricePerShare", pps);

    console.log('-------------deposit time 3: 50$---------------');
    await deposit(user1, 50 * 1e6);

    pps = await rockOnyxUSDTVaultContract
    .connect(admin)
    .pricePerShare();
    console.log("pricePerShare", pps);

    console.log('-------------close round time 4---------------');
    const closeRound4Tx = await rockOnyxUSDTVaultContract
      .connect(admin)
      .closeRound();
    await closeRound4Tx.wait();

    pps = await rockOnyxUSDTVaultContract
    .connect(admin)
    .pricePerShare();
    console.log("pricePerShare", pps);
  });
});