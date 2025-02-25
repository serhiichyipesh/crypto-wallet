export const getUsdValue = (value: bigint, decimals: number) => {
  return Number(value) / 10 ** decimals;
};
