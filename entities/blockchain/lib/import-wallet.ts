import { mnemonicToAccount } from 'viem/accounts';
import { getPrivateKey } from '@entities/blockchain';

export const importWallet = (mnemonic: string) => {
  const account = mnemonicToAccount(mnemonic);

  const address = account.address;
  const privateKey = account.getHdKey().privateKey;

  if (!address || !privateKey) return null;

  return {
    address: account.address,
    privateKey: getPrivateKey(privateKey),
    mnemonic,
  };
};
