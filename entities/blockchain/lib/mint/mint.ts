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
  amountToSend,
}: TSendTransferPayload) => {
  const chainId = chain.id;
  const tokenAddress = gasTokenAddresses[chainId][asset.symbol];
  const transferAmountBigInt = BigInt(amountToSend * 10 ** asset.decimals);

  const calls = [
    {
      to: tokenAddress,
      value: BigInt(0),
      data: encodeFunctionData({
        abi: ERC20_TOKEN_MINT_ABI,
        args: [destinationAddress, transferAmountBigInt],
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
