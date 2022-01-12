import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

// 1 mainnet
// 3 repsten
// 4 rinkeby
// 5 goerli
// 42 kovan
export const ChainIds = [1, 3, 4, 5, 42];

const injectedConnector = new InjectedConnector({
  supportedChainIds: ChainIds,
});
export { injectedConnector as InjectedConnector };

const walletConnectConnector = new WalletConnectConnector({
  infuraId: process.env.InfuraId || 'd5e2d1fa6d474634bb9f4dbcf5b36b34',
  supportedChainIds: ChainIds,
});
export { walletConnectConnector as WalletConnectConnector };

export const Connector = {
  MetaMask: injectedConnector,
  WalletConnect: walletConnectConnector,
} as const;
