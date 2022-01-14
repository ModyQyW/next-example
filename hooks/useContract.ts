import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { ABI } from '@/constants';

export function useContract() {
  const [contract, setContract] = useState<Contract | undefined | null>();
  const { library, active, chainId } = useWeb3React();

  useEffect(() => {
    if (active && chainId && library?.getSigner()) {
      const signer = library.getSigner();
      const newContract = new Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
        ABI,
        signer,
      );
      setContract(newContract);
    }
  }, [library, active, chainId]);

  return contract;
}
