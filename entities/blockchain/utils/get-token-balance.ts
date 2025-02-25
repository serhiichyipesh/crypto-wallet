import to from 'await-to-js';
import { Address, PublicClient } from 'viem';
import { ERC20_TOKEN_BALANCEOF_ABI } from '@/entities/blockchain';

export const getTokenBalance = async (
  client: PublicClient,
  address: Address,
  contractAddress: Address
) => {
  const [err, value] = await to(
    client.readContract({
      address: contractAddress,
      abi: ERC20_TOKEN_BALANCEOF_ABI,
      functionName: 'balanceOf',
      args: [address],
    })
  );

  if (err) {
    throw new Error(`Error while reading balance: ${err}`);
  }

  return value as bigint;
};
