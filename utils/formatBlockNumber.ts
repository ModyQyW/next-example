export function formatBlockNumber(blockNumber: number | undefined | null) {
  return blockNumber === null ? 'Error' : blockNumber ?? '';
}
