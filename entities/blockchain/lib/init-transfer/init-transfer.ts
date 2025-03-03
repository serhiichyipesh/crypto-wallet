import { http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { BLOCKCHAIN_CONFIG, TSendTransferPayload } from '@entities/blockchain';
import to from 'await-to-js';
import { createSmartAccountClient } from 'permissionless';
import { toKernelSmartAccount } from 'permissionless/accounts';
import { createPimlicoClient } from 'permissionless/clients/pimlico';
import { entryPoint07Address } from 'viem/account-abstraction';
import { API_KEY, API_URL } from '@shared/config';

export const initTransfer = async ({
  chain,
  privateKey,
}: Pick<TSendTransferPayload, 'chain' | 'privateKey'>) => {
  const owner = privateKeyToAccount(privateKey);
  const chainId = chain.id;

  const BUNDLER_URL = http(`${API_URL}/${chainId}/rpc?apikey=${API_KEY}`);

  const publicClient = BLOCKCHAIN_CONFIG.PUBLIC_CLIENT_BY_CHAIN_MAP[chainId];

  const paymasterClient = createPimlicoClient({
    transport: BUNDLER_URL,
    entryPoint: {
      address: entryPoint07Address,
      version: '0.7',
    },
  });

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

  if (kernelAccountErr) throw kernelAccountErr;

  return createSmartAccountClient({
    chain,
    account: kernelAccount,
    paymaster: paymasterClient,
    bundlerTransport: BUNDLER_URL,
    userOperation: {
      estimateFeesPerGas: async () =>
        (await paymasterClient.getUserOperationGasPrice()).fast,
    },
  });
};
