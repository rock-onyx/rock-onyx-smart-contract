export const AddressZero = "0x0000000000000000000000000000000000000000";

export enum CHAINID {
  ETH_MAINNET = 1, // eslint-disable-line no-unused-vars
  ETH_KOVAN = 42, // eslint-disable-line no-unused-vars
  ETH_GOERLI = 5, // eslint-disable-line no-unused-vars
  ETH_SEPOLIA = 11155111, // eslint-disable-line no-unused-vars
  AVAX_MAINNET = 43114, // eslint-disable-line no-unused-vars
  AVAX_FUJI = 43113, // eslint-disable-line no-unused-vars
  ARBITRUM_MAINNET = 42161, // eslint-disable-line no-unused-vars
}

export const WETH_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  [CHAINID.ETH_GOERLI]: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  [CHAINID.ETH_SEPOLIA]: "0x5551d35dE07BebC4e6a5FAdc1c9073ce02a02b5F",
  [CHAINID.ARBITRUM_MAINNET]: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
};

export const EZETH_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
}

export const RENZO_DEPOSIT_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x74a09653A083691711cF8215a6ab074BB4e99ef5",
}

export const ZIRCUIT_DEPOSIT_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xF047ab4c75cebf0eB9ed34Ae2c186f3611aEAfa6",
}

export const WSTETH_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
  [CHAINID.ETH_SEPOLIA]: "0x2C5E28dEaa0E10241Ba38d136EBed75037732c15",
  [CHAINID.ARBITRUM_MAINNET]: "0x5979D7b546E38E414F7E9822514be443A4800529",
};

export const USDC_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [CHAINID.ETH_SEPOLIA]: "0xA33a482E2e470E2d1286d0e791923657F59428f2",
  [CHAINID.ARBITRUM_MAINNET]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
};

export const USDCE_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_SEPOLIA]: "0xd654B1bA9FfC696285FA8deF26eEbAdD7D875033",
  [CHAINID.ARBITRUM_MAINNET]: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
};

export const ARB_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ARBITRUM_MAINNET]: "0x912ce59144191c1204e64559fe8253a0e49e6548",
};

export const ANGLE_REWARD_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ARBITRUM_MAINNET]: "0x3Ef3D8bA38EBe18DB133cEc108f4D14CE00Dd9Ae",
};

export const NonfungiblePositionManager: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_SEPOLIA]: "0x00c7f3082833e796A5b3e4Bd59f6642FF44DCD15",
  [CHAINID.ARBITRUM_MAINNET]: "0x00c7f3082833e796A5b3e4Bd59f6642FF44DCD15",
};

export const SWAP_ROUTER_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  [CHAINID.ARBITRUM_MAINNET]: "0x1F721E2E82F6676FCE4eA07A5958cF098D339e18",
};

export const UNISWAP_FACTORY_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  [CHAINID.ARBITRUM_MAINNET]: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
};

export const AEVO_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x4082C9647c098a6493fb499EaE63b5ce3259c574",
  [CHAINID.ARBITRUM_MAINNET]: "0xfb73dfff0ae6aa94559b1b17421cf42e198b8d22",
};

export const AEVO_CONNECTOR_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x070FeadF2208303d341D1d2DA6aa41395f8BCE43",
  [CHAINID.ARBITRUM_MAINNET]: "0x070FeadF2208303d341D1d2DA6aa41395f8BCE43",
};

export const USDC_IMPERSONATED_SIGNER_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x13e003a57432062e4EdA204F687bE80139AD622f",
  [CHAINID.ETH_SEPOLIA]: "0x1A8dC40895883B270564939bD9922EBfeE8857e4",
  [CHAINID.ARBITRUM_MAINNET]: "0x1714400ff23db4af24f9fd64e7039e6597f18c2b",
};

export const USDCE_IMPERSONATED_SIGNER_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_SEPOLIA]: "0x1A8dC40895883B270564939bD9922EBfeE8857e4",
  [CHAINID.ARBITRUM_MAINNET]: "0xb008b99af59d3a01ea430af25a817e7f3965285a",
};

export const WETH_IMPERSONATED_SIGNER_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_SEPOLIA]: "0x1A8dC40895883B270564939bD9922EBfeE8857e4",
  [CHAINID.ARBITRUM_MAINNET]: "0x1eed63efba5f81d95bfe37d82c8e736b974f477b",
};

export const WSTETH_IMPERSONATED_SIGNER_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_SEPOLIA]: "0x1A8dC40895883B270564939bD9922EBfeE8857e4",
  [CHAINID.ARBITRUM_MAINNET]: "0x36a5732960513ad26a99e2bd6159dff2ab94a678",
};

export const AEVO_TRADER_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_SEPOLIA]: "0xd8704552a605Db1dF4a3f0F5006B364Ab307038c",
  [CHAINID.ARBITRUM_MAINNET]: "0xdf46e88E2e26FC90B8e3ca4D36fA524406b0Cc19",
};

export const NFT_POSITION_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ARBITRUM_MAINNET]: "0x00c7f3082833e796a5b3e4bd59f6642ff44dcd15",
};

export const ETH_PRICE_FEED_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  [CHAINID.ARBITRUM_MAINNET]: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
};

export const WSTETH__ETH_PRICE_FEED_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ARBITRUM_MAINNET]: "0xb523AE262D20A936BC152e6023996e46FDC2A95D",
};

export const EZTETH__ETH_PRICE_FEED_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x636A000262F6aA9e1F094ABF0aD8f645C44f641C",
  [CHAINID.ARBITRUM_MAINNET]: "0x11E1836bFF2ce9d6A5bec9cA79dc998210f3886d",
};

export const ARB_PRICE_FEED_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ARBITRUM_MAINNET]: "0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6",
};

export const USDC_PRICE_FEED_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
  [CHAINID.ARBITRUM_MAINNET]: "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3",
};

export const PRICE_CONSUMER_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ARBITRUM_MAINNET]: "",
};


