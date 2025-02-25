import { Hex } from 'viem';

export const getPrivateKey = (privateKey: Uint8Array): Hex => {
  return `0x${Buffer.from(privateKey).toString('hex')}`;
};
