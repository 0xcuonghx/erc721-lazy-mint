import { createConfig, configureChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { sandbox } from '@/app/lib/constants/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sandbox],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [new MetaMaskConnector({ chains })],
});

const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WagmiProvider;
