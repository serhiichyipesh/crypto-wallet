import {
  fetchWalletsBalances,
  TBalanceByToken,
  TSupportedAssetSymbolTestnet,
  TSupportedChainIdTestnet,
} from '@entities/blockchain';
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import to from 'await-to-js';
import { pause } from '@shared/lib';
import { Address } from 'viem';

export const useBalances = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: walletsBalances, refetch } = useQuery({
    queryKey: ['walletsBalances'],
    queryFn: async () => {
      const [err, res] = await to(fetchWalletsBalances());

      if (err) {
        throw err;
      }

      return res;
    },
  });

  const totalBalance = Object.values(walletsBalances || {}).reduce(
    (acc, current) => acc + current.totalBalanceUsd,
    0
  );

  const refreshBalances = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    await pause(1000);
    setIsRefreshing(false);
  }, []);

  const getTokenToSend = ({
    walletAddress,
    networkId,
    assetSymbol,
  }: {
    walletAddress: Address;
    networkId: TSupportedChainIdTestnet;
    assetSymbol: TSupportedAssetSymbolTestnet | undefined;
  }): TBalanceByToken | null => {
    if (!walletsBalances || !assetSymbol) return null;

    const balances = walletsBalances[walletAddress]?.balancesByChain;

    return (
      balances
        ?.find((balance) => balance?.chainId === networkId)
        ?.balancesByToken.find((token) => token.symbol === assetSymbol) || null
    );
  };

  return {
    refreshBalances,
    totalBalance,
    isRefreshingBalance: isRefreshing,
    walletsBalances,
    refetchBalances: refetch,
    getTokenToSend,
  };
};
