import {
  BLOCKCHAIN_CONFIG,
  checkIsDeployed,
  getTokenBalance,
  getUsdValue,
  TBalanceByToken,
  TBalancesByChain,
  useWalletsStore,
} from '@/entities/blockchain';
import to from 'await-to-js';

export const fetchWalletsBalances = async () => {
  const wallets = useWalletsStore.getState().wallets;
  if (!wallets.length) return {};

  const results = await Promise.allSettled(
    wallets.map(async (wallet) => {
      let totalBalanceUsd = 0;
      const balancesByChain: TBalancesByChain[] = [];

      await Promise.all(
        BLOCKCHAIN_CONFIG.SUPPORTED_CHAINS_TESTNET.map(async (chain) => {
          const chainId = chain.id;

          const supportedTokens = Object.values(
            BLOCKCHAIN_CONFIG.SUPPORTED_ASSETS[chainId]
          );
          if (!supportedTokens) {
            return;
          }

          await Promise.all(
            supportedTokens.map(async (token) => {
              const publicClient =
                BLOCKCHAIN_CONFIG.PUBLIC_CLIENT_BY_CHAIN_MAP[chainId];
              if (!publicClient) {
                return;
              }

              const [errErc20, value] = await to(
                getTokenBalance(publicClient, wallet.address, token.address)
              );
              if (errErc20) {
                throw new Error(
                  `Error getting ERC20 token balance for wallet ${wallet.address}, token ${token.symbol}: ${errErc20}`
                );
              }

              const decimals = token.decimals;
              if (!decimals) return;

              const usdValue = getUsdValue(value, decimals);
              totalBalanceUsd += usdValue;

              const tokenBalance: TBalanceByToken = {
                symbol: token.symbol,
                balanceUsd: usdValue,
                value: value.toString(),
                decimals,
                valueFormatted: Number(value) / 10 ** decimals,
              };

              const chainIndex = balancesByChain.findIndex(
                (balance) => balance.chainId === chainId
              );
              if (chainIndex === -1) {
                balancesByChain.push({
                  chainId,
                  balanceUsd: usdValue,
                  balancesByToken: [tokenBalance],
                });
              } else {
                const existingChain = balancesByChain[chainIndex];
                const tokenIndex = existingChain.balancesByToken.findIndex(
                  (t) => t.symbol === token.symbol
                );
                if (tokenIndex === -1) {
                  existingChain.balancesByToken.push(tokenBalance);
                  existingChain.balanceUsd += usdValue;
                } else {
                  const existingToken =
                    existingChain.balancesByToken[tokenIndex];
                  const updatedRawValue =
                    Number(existingToken.value) + Number(value);
                  const updatedValueFormatted =
                    existingToken.valueFormatted +
                    Number(value) / 10 ** decimals;
                  existingChain.balancesByToken[tokenIndex] = {
                    ...existingToken,
                    balanceUsd: existingToken.balanceUsd + usdValue,
                    value: updatedRawValue.toString(),
                    valueFormatted: updatedValueFormatted,
                  };
                  existingChain.balanceUsd += usdValue;
                }
              }
            })
          );
        })
      );

      return {
        walletAddress: wallet.address,
        totalBalanceUsd,
        balancesByChain,
      };
    })
  );

  const walletBalancesMap: Record<
    string,
    { totalBalanceUsd: number; balancesByChain: TBalancesByChain[] }
  > = {};

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      const { walletAddress, totalBalanceUsd, balancesByChain } = result.value;
      walletBalancesMap[walletAddress] = { totalBalanceUsd, balancesByChain };
    }
  });

  return walletBalancesMap;
};
