import { useEffect, useState } from 'react';
import { useContract } from './useContract';

export function useSaleState() {
  const contract = useContract();
  const [saleState, setSaleState] = useState<number | undefined | null>();

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (contract?._config) {
      // eslint-disable-next-line no-underscore-dangle
      contract
        ._config()
        .then((response: any) => {
          setSaleState(response.saleState);
        })
        .catch(() => {
          setSaleState(null);
        });
    }

    return () => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setSaleState(undefined);
    };
  }, [contract]);

  return saleState;
}
