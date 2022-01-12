import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const ChainIds = [1, 3, 4, 5, 42];

const injectedConnector = new InjectedConnector({
  supportedChainIds: ChainIds,
});
export { injectedConnector as InjectedConnector };

const walletConnectConnector = new WalletConnectConnector({
  // rpc: {
  //   1: 'a link with a infuraId, using process.env may be a good choice',
  //   3: 'a link with a infuraId, using process.env may be a good choice',
  //   4: 'a link with a infuraId, using process.env may be a good choice',
  //   5: 'a link with a infuraId, using process.env may be a good choice',
  //   42: 'a link with a infuraId, using process.env may be a good choice',
  // },
  supportedChainIds: ChainIds,
});
export { walletConnectConnector as WalletConnectConnector };

export const Connector = {
  MetaMask: injectedConnector,
  WalletConnect: walletConnectConnector,
} as const;
