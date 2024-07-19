import { createConfig, configureChains } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

// Define ClishaChain
const clishaChain = {
  id: 3890, // chain ID of ClishaChain
  name: 'ClishaChain',
  network: 'clishachain',
  nativeCurrency: {
    decimals: 18,
    name: 'CLISHA',
    symbol: 'CLISHA',
  },
  rpcUrls: {
    public: { http: ['https://rpc.clishachain.com/rpc'] }, // RPC URL
    default: { http: ['https://rpc.clishachain.com/rpc'] }, // RPC URL
  },
  blockExplorers: {
    default: { name: 'ClishaScan', url: 'https://clishascan.com' }, // Block explorer URL
  },
  testnet: false,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [clishaChain],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.rpcUrls.default.http[0],
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Clisha Staking",
  projectId: import.meta.env.VITE_CLISHA_PROJECT_ID,
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { config, chains };