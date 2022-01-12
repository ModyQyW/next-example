import { formatEther } from '@ethersproject/units';
import { BigNumberish } from '@ethersproject/bignumber';

export function formatBalance(balance: BigNumberish | undefined | null) {
  return balance === null ? 'Error' : balance ? `Ξ${formatEther(balance)}` : '';
}
