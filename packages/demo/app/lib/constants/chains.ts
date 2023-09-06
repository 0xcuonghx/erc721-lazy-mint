import { Chain } from 'viem';

export const sandbox: Chain = {
  id: 99999,
  network: 'G.U.Sandbox chain',
  name: 'G.U.Sandbox chain',
  nativeCurrency: {
    name: 'GU Ether',
    symbol: 'STH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://sandbox1.japanopenchain.org:8545'],
    },
    public: {
      http: ['https://sandbox1.japanopenchain.org:8545'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://sandbox1.japanopenchain.org',
    },
  },
  testnet: true,
};
