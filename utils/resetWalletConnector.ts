// https://github.com/NoahZinsmeister/web3-react/issues/124#issuecomment-984882534
import { Connector } from '@/constants';

export const resetWalletConnectProvider = () => {
  if (Connector?.WalletConnect?.walletConnectProvider) {
    Connector.WalletConnect.walletConnectProvider = undefined;
  }
};
