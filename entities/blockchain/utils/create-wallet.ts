import '@ethersproject/shims';

import { ethers } from 'ethers';
import { Address, Hex } from 'viem';

export const createWallet = async () => {
  const wallet = ethers.Wallet.createRandom();

  const mnemonic = wallet.mnemonic?.phrase;
  const privateKey = wallet.privateKey as Hex;
  const address = wallet.address as Address;

  if (!mnemonic || !privateKey || !address) return null;

  return {
    mnemonic,
    address,
    privateKey: privateKey,
  };
};
