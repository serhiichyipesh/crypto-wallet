export const trimHex = (
  str: string,
  startLength: number = 7,
  endLength: number = 7
): string => {
  if (str?.length <= startLength + endLength) {
    return str;
  }

  const start = str?.slice(0, startLength);
  const end = str?.slice(-endLength);

  return `${start}...${end}`;
};
