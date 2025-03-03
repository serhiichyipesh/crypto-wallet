import '@ethersproject/shims';

import { ethers } from 'ethers';
import { Hex } from 'viem';
import to from 'await-to-js';
import { toKernelSmartAccount } from 'permissionless/accounts';
import { entryPoint07Address } from 'viem/account-abstraction';
import { privateKeyToAccount } from 'viem/accounts';
import { BLOCKCHAIN_CONFIG } from '@entities/blockchain';
import { sepolia } from 'viem/chains';

export const createWallet = async () => {
  const wallet = ethers.Wallet.createRandom();

  const mnemonic = wallet.mnemonic?.phrase;
  const privateKey = wallet.privateKey as Hex;

  const owner = privateKeyToAccount(privateKey);

  const publicClient = BLOCKCHAIN_CONFIG.PUBLIC_CLIENT_BY_CHAIN_MAP[sepolia.id];

  const [kernelAccountErr, kernelAccount] = await to(
    toKernelSmartAccount({
      client: publicClient,
      entryPoint: {
        address: entryPoint07Address,
        version: '0.7',
      },
      owners: [owner],
    })
  );

  if (kernelAccountErr || !kernelAccount) return null;

  const { address } = kernelAccount;

  if (!mnemonic || !privateKey || !address) return null;

  return {
    mnemonic,
    address,
    privateKey: privateKey,
  };
};
