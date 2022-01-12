import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

export function useBlockNumber() {
  const { library, chainId } = useWeb3React();

  const [blockNumber, setBlockNumber] = useState<number | undefined | null>();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (library) {
      let stale = false;
      library
        .getBlockNumber()
        .then((newBlockNumber: number) => {
          if (!stale) {
            setBlockNumber(newBlockNumber);
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null);
          }
        });
      const updateBlockNumber = (newBlockNumber: number) => {
        setBlockNumber(newBlockNumber);
      };
      library.on('block', updateBlockNumber);
      return () => {
        stale = true;
        library.removeListener('block', updateBlockNumber);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setBlockNumber(undefined);
      };
    }
  }, [library, chainId]);

  return blockNumber;
}
