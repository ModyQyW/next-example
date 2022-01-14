export function formatSaleState(saleState: number | undefined | null) {
  return saleState ? 'On' : 'Off';
}
