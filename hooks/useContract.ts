import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { ABI } from '@/constants';

export function useContract() {
  const { library, active, chainId } = useWeb3React();

  const [contract, setContract] = useState<Contract | undefined | null>();

  useEffect(() => {
    if (active && chainId && library?.getSigner()) {
      setContract(
        new Contract('0x179bEEC76f1af3DE20b9F38AD0E33ad06164bb0C', ABI, library.getSigner()),
      );
    }

    return () => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setContract(undefined);
    };
  }, [library, active, chainId]);

  return contract;
}
