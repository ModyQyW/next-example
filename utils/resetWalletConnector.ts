// https://github.com/NoahZinsmeister/web3-react/issues/124#issuecomment-984882534
import { Connector } from '@/constants';

export const resetWalletConnectProvider = () => {
  Connector.WalletConnect.walletConnectProvider = undefined;
};
