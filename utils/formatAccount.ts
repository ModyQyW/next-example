export function formatAccount(account: string | undefined | null) {
  return account === null ? '-' : account ? `${account.slice(0, 5)}...${account.slice(-4)}` : '';
}
