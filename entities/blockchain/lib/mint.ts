import { encodeFunctionData } from 'viem';
import {
  ERC20_TOKEN_MINT_ABI,
  gasTokenAddresses,
  initTransfer,
  TSendTransferPayload,
} from '@entities/blockchain';
import to from 'await-to-js';

export const mint = async ({
  chain,
  asset,
  privateKey,
  destinationAddress,
}: TSendTransferPayload) => {
  const chainId = chain.id;
  const tokenAddress = gasTokenAddresses[chainId][asset.symbol];
  const calls = [
    {
      to: tokenAddress,
      value: BigInt(0),
      data: encodeFunctionData({
        abi: ERC20_TOKEN_MINT_ABI,
        args: [destinationAddress, BigInt(10000000000)],
      }),
    },
  ];

  const [smartAccountClientErr, smartAccountClient] = await to(
    initTransfer({ privateKey, chain })
  );

  if (smartAccountClientErr) throw smartAccountClientErr;

  const [err, txHash] = await to(smartAccountClient.sendTransaction({ calls }));

  if (err) throw err;

  return txHash;
};
