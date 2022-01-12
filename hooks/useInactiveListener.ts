/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { InjectedConnector } from '@/constants';

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React();

  // eslint-disable-next-line consistent-return
  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        // console.log("Handling 'connect' event");
        activate(InjectedConnector);
      };
      const handleChainChanged = (chainId: string | number) => {
        // console.log("Handling 'chainChanged' event with payload", chainId);
        activate(InjectedConnector);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        // console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(InjectedConnector);
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        // console.log("Handling 'networkChanged' event with payload", networkId);
        activate(InjectedConnector);
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
}
/* eslint-enable @typescript-eslint/no-unused-vars */
