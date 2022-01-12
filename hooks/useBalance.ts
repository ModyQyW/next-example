import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumberish } from '@ethersproject/bignumber';

export function useBalance() {
  const { account, library, chainId } = useWeb3React();

  const [balance, setBalance] = useState<BigNumberish | undefined | null>();
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (account && library) {
      let stale = false;

      library
        .getBalance(account)
        .then((newBalance: BigNumberish) => {
          if (!stale) {
            setBalance(newBalance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        // eslint-disable-next-line unicorn/no-useless-undefined
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]);

  return balance;
}
