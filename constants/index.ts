export const AddressZero = "0x0000000000000000000000000000000000000000";

export enum CHAINID {
  ETH_MAINNET = 1, // eslint-disable-line no-unused-vars
  ETH_KOVAN = 42, // eslint-disable-line no-unused-vars
  ETH_GOERLI = 5, // eslint-disable-line no-unused-vars
  ETH_SEPOLIA = 11155111, // eslint-disable-line no-unused-vars
  AVAX_MAINNET = 43114, // eslint-disable-line no-unused-vars
  AVAX_FUJI = 43113, // eslint-disable-line no-unused-vars
  ARBITRUM_MAINNET = 42161, // eslint-disable-line no-unused-vars
  BASE_MAINNET = 8453, // eslint-disable-line no-unused-vars
}

export const WETH_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  [CHAINID.ETH_GOERLI]: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  [CHAINID.ETH_SEPOLIA]: "0x5551d35dE07BebC4e6a5FAdc1c9073ce02a02b5F",
  [CHAINID.ARBITRUM_MAINNET]: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  [CHAINID.BASE_MAINNET]: "0x4200000000000000000000000000000000000006",
};

export const EZETH_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
  [CHAINID.ARBITRUM_MAINNET]: "0x2416092f143378750bb29b79eD961ab195CcEea5",
}

export const RSETH_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7",
  [CHAINID.ARBITRUM_MAINNET]: "0x4186BFC76E2E237523CBC30FD220FE055156b41F",
}

export const WEETH_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee",
  [CHAINID.BASE_MAINNET]: "0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A",
}

export const RENZO_DEPOSIT_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x0000000000000000000000000000000000000000",  // for swap
  [CHAINID.ARBITRUM_MAINNET]: "0x0000000000000000000000000000000000000000",
  // [CHAINID.ETH_MAINNET]: "0x74a09653A083691711cF8215a6ab074BB4e99ef5",
  // [CHAINID.ARBITRUM_MAINNET]: "0xf25484650484DE3d554fB0b7125e7696efA4ab99",
}

export const KELP_DEPOSIT_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x0000000000000000000000000000000000000000",
  [CHAINID.ARBITRUM_MAINNET]: "0x0000000000000000000000000000000000000000",
  // [CHAINID.ETH_MAINNET]: "0x036676389e48133b63a802f8635ad39e752d375d",
  // [CHAINID.ARBITRUM_MAINNET]: "0x376A7564AF88242D6B8598A5cfdD2E9759711B61",
}

export const ETHERFI_DEPOSIT_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.BASE_MAINNET]: "0xc38e046dFDAdf15f7F56853674242888301208a5",
}

export const KELP_DEPOSIT_REF_ID: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "",
  [CHAINID.ARBITRUM_MAINNET]: "",
}

export const ZIRCUIT_DEPOSIT_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xF047ab4c75cebf0eB9ed34Ae2c186f3611aEAfa6",
  [CHAINID.ARBITRUM_MAINNET]: "0x0000000000000000000000000000000000000000",
}

export const WSTETH_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
  [CHAINID.ETH_SEPOLIA]: "0x2C5E28dEaa0E10241Ba38d136EBed75037732c15",
  [CHAINID.ARBITRUM_MAINNET]: "0x5979D7b546E38E414F7E9822514be443A4800529",
  [CHAINID.BASE_MAINNET]: "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452",
};

export const USDC_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [CHAINID.ETH_SEPOLIA]: "0xA33a482E2e470E2d1286d0e791923657F59428f2",
  [CHAINID.ARBITRUM_MAINNET]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  [CHAINID.BASE_MAINNET]: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
};

export const USDCE_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_SEPOLIA]: "0xd654B1bA9FfC696285FA8deF26eEbAdD7D875033",
  [CHAINID.ARBITRUM_MAINNET]: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
};

export const USDT_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  [CHAINID.ARBITRUM_MAINNET]: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  [CHAINID.BASE_MAINNET]: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
};

export const DAI_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  [CHAINID.ARBITRUM_MAINNET]: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  [CHAINID.BASE_MAINNET]: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
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

export const UNISWAP_ROUTER_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  [CHAINID.ARBITRUM_MAINNET]: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  [CHAINID.BASE_MAINNET]: "0x2626664c2603336E57B271c5C0b26F421741e481",
};

export const AEVO_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x4082C9647c098a6493fb499EaE63b5ce3259c574",
  [CHAINID.ARBITRUM_MAINNET]: "0xfb73dfff0ae6aa94559b1b17421cf42e198b8d22",
};

export const AEVO_CONNECTOR_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x0000000000000000000000000000000000000000",
  [CHAINID.ARBITRUM_MAINNET]: "0x070FeadF2208303d341D1d2DA6aa41395f8BCE43",
};

export const BSX_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.BASE_MAINNET]: "0x26A54955a5fb9472D3eDFeAc9B8E4c0ab5779eD3",
};

export const USDC_IMPERSONATED_SIGNER_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x13e003a57432062e4EdA204F687bE80139AD622f",
  [CHAINID.ETH_SEPOLIA]: "0x1A8dC40895883B270564939bD9922EBfeE8857e4",
  [CHAINID.ARBITRUM_MAINNET]: "0x1714400ff23db4af24f9fd64e7039e6597f18c2b",
  [CHAINID.BASE_MAINNET]: "0xBaeD383EDE0e5d9d72430661f3285DAa77E9439F",
};

export const USDT_IMPERSONATED_SIGNER_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x9E4E147d103deF9e98462884E7Ce06385f8aC540",
  [CHAINID.ARBITRUM_MAINNET]: "0x1AB4973a48dc892Cd9971ECE8e01DcC7688f8F23",
  [CHAINID.BASE_MAINNET]: "0xcBAC839561d33080fA65Cb878ab8856188e84eD3",
};

export const DAI_IMPERSONATED_SIGNER_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xD1668fB5F690C59Ab4B0CAbAd0f8C1617895052B",
  [CHAINID.ARBITRUM_MAINNET]: "0x2d070ed1321871841245D8EE5B84bD2712644322",
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
  [CHAINID.BASE_MAINNET]: "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
};

export const USDT_PRICE_FEED_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
  [CHAINID.ARBITRUM_MAINNET]: "0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7",
  [CHAINID.BASE_MAINNET]: "0xf19d560eB8d2ADf07BD6D13ed03e1D11215721F9",
};

export const DAI_PRICE_FEED_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
  [CHAINID.ARBITRUM_MAINNET]: "0xc5C8E77B397E531B8EC06BFb0048328B30E9eCfB",
};

export const WSTETH_ETH_PRICE_FEED_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xb523AE262D20A936BC152e6023996e46FDC2A95D",
  [CHAINID.ARBITRUM_MAINNET]: "0xb523AE262D20A936BC152e6023996e46FDC2A95D",
  [CHAINID.BASE_MAINNET]: "0xa669E5272E60f78299F4824495cE01a3923f4380",
};

export const EZETH_ETH_PRICE_FEED_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x636A000262F6aA9e1F094ABF0aD8f645C44f641C",
  [CHAINID.ARBITRUM_MAINNET]: "0x11E1836bFF2ce9d6A5bec9cA79dc998210f3886d",
};

export const RSETH_ETH_PRICE_FEED_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x03c68933f7a3F76875C0bc670a58e69294cDFD01",
  [CHAINID.ARBITRUM_MAINNET]: "0xb0EA543f9F8d4B818550365d13F66Da747e1476A",
};

export const WEETH_ETH_PRICE_FEED_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.BASE_MAINNET]: "0xFC1415403EbB0c693f9a7844b92aD2Ff24775C65",
};

export const ARB_PRICE_FEED_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6",
  [CHAINID.ARBITRUM_MAINNET]: "0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6",
};

export const USDC_PRICE_FEED_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
  [CHAINID.ARBITRUM_MAINNET]: "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3",
};

export const USDCE_USDC_PRICE_FEED_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ARBITRUM_MAINNET]: "0x4392c8D194C074A98034BB66A1235f9a3B24AC12",
};

export const PRICE_CONSUMER_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x17FaBB6235383094938d250C4472308Ab1A70F40",
  [CHAINID.ARBITRUM_MAINNET]: "0x17FaBB6235383094938d250C4472308Ab1A70F40",
  [CHAINID.BASE_MAINNET]: "0xe1856734933b1fE219AE2F13e8CBef8FBBc4A9C3",
};

export const CAMELOT_SWAP_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "",
  [CHAINID.ARBITRUM_MAINNET]: "0x5c2fEC58221daC4d3945Dd4Ac7a956d6C965ba1c",
};

export const CAMELOT_LIQUIDITY_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "",
  [CHAINID.ARBITRUM_MAINNET]: "0x9be0ecF2d0e04796eFa1CeDEcB0Bf5Beb6e86993",
};

export const UNI_SWAP_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "0x5c2fEC58221daC4d3945Dd4Ac7a956d6C965ba1c",
  [CHAINID.ARBITRUM_MAINNET]: "0xbb08a05fE1c647E7e469eb79A87f3d3362719610",
  [CHAINID.BASE_MAINNET]: "0x85487BBe787D5743905f426996eFf50a6aa2189C",
};

export const RENZO_TOKEN_HOLDER_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "",
  [CHAINID.ARBITRUM_MAINNET]: "",
};

export const KELPDAO_TOKEN_HOLDER_ADDRESS: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "",
  [CHAINID.ARBITRUM_MAINNET]: "0xa48391C9b82A16c325C55856A53c48D4eF114Dac",
};

export const NETWORK_COST: { [key in CHAINID]?: string } = {
  [CHAINID.ETH_MAINNET]: "5",
  [CHAINID.ETH_SEPOLIA]: "5",
  [CHAINID.ARBITRUM_MAINNET]: "1",
  [CHAINID.BASE_MAINNET]: "1",
};