import { create } from 'zustand';
import { createJSONStorage, persist, PersistStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { Address, Hex } from 'viem';
import { createSelectors } from 'shared/lib';

const secureStorage = createJSONStorage(() => ({
  getItem: async (key) => {
    const value = await SecureStore.getItemAsync(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (key, value) => {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  },
  removeItem: async (key) => {
    await SecureStore.deleteItemAsync(key);
  },
}));

export type TWallet = {
  name: string;
  address: Address;
  mnemonic: string;
  privateKey: Hex;
};

type TWalletToAdd = Omit<TWallet, 'name'>;

type TWalletsStore = {
  wallets: TWallet[];
  addWallet: (wallet: TWalletToAdd) => void;
  renameWallet: (address: Address, newName: string) => void;
  getWalletInfo: (address: Address) => TWallet | null;
  deleteWallet: (address: Address) => void;
  clearStore: () => void;
};

const generateWalletName = (existingNames: string[]) => {
  let index = 1;

  while (existingNames.includes(`wallet${index}`)) {
    index++;
  }

  return `wallet${index}`;
};

const walletsStoreBase = create(
  persist<TWalletsStore>(
    (set, get) => ({
      wallets: [],
      addWallet: (wallet) =>
        set((state) => {
          const existingNames = state.wallets.map((w) => w.name);
          const newName = generateWalletName(existingNames);

          return {
            wallets: [...state.wallets, { ...wallet, name: newName }],
          };
        }),
      renameWallet: (address, newName) =>
        set((state) => ({
          wallets: state.wallets.map((wallet) =>
            wallet.address === address ? { ...wallet, name: newName } : wallet
          ),
        })),
      getWalletInfo: (address) =>
        get().wallets.find((wallet) => wallet.address === address) || null,
      deleteWallet: (address) =>
        set((state) => ({
          wallets: state.wallets.filter((wallet) => wallet.address !== address),
        })),
      clearStore: () => set({ wallets: [] }),
    }),
    {
      name: 'wallets-storage',
      storage: secureStorage as PersistStorage<TWalletsStore>,
    }
  )
);

export const useWalletsStore = createSelectors(walletsStoreBase);

export const useWallets = () => {
  const wallets = useWalletsStore.use.wallets();
  const addWallet = useWalletsStore.use.addWallet();
  const renameWallet = useWalletsStore.use.renameWallet();
  const clearStore = useWalletsStore.use.clearStore();
  const getWalletInfo = useWalletsStore.use.getWalletInfo();
  const deleteWallet = useWalletsStore.use.deleteWallet();

  const hasAnyWallet = !!wallets.length;

  const checkIfWalletAdded = (address: Address): boolean => {
    if (!hasAnyWallet) return false;

    return wallets.some((wallet) => wallet.address === address);
  };

  return {
    wallets,
    addWallet,
    renameWallet,
    clearStore,
    hasAnyWallet,
    getWalletInfo,
    deleteWallet,
    checkIfWalletAdded,
  };
};
