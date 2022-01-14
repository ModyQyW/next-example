import { useEffect, useState } from 'react';
import { useContract } from './useContract';

export function useSaleState() {
  const contract = useContract();
  const [saleState, setSaleState] = useState<number | undefined | null>();

  useEffect(() => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      contract?._config().then((response: any) => {
        setSaleState(response.saleState);
      });
    } catch (error) {
      // TODO
      console.error('error', error);
    }
  }, [contract]);

  return saleState;
}
