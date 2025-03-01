import { create } from 'zustand';
import to from 'await-to-js';
import { createSelectors, getTextFromClipboard } from '@shared/lib';
import { Address, Hex } from 'viem';
import {
  TSupportedAssetTestnet,
  TSupportedChainTestnet,
  TWallet,
} from '@entities/blockchain';

import { BLOCKCHAIN_CONFIG } from '../constants';

type TSendFlowStoreItems = {
  currentStep: number;
  selectedWallet: TWallet | null;
  selectedNetwork: TSupportedChainTestnet;
  selectedAsset: TSupportedAssetTestnet | null;
  amountToSend: string;
  destinationAddress: Address;
};

type TSendFlowStoreActions = {
  setField: <K extends keyof TSendFlowStoreItems>(
    field: K,
    value: TSendFlowStore[K]
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
  handlePaste: () => Promise<void>;
  clearStore: () => void;
};

export type TSendFlowStore = TSendFlowStoreItems & TSendFlowStoreActions;

const initialState: TSendFlowStoreItems = {
  currentStep: 0,
  selectedWallet: null,
  selectedNetwork: BLOCKCHAIN_CONFIG.SUPPORTED_CHAINS_TESTNET[0],
  selectedAsset: null,
  amountToSend: '',
  destinationAddress: '' as Address,
};

const sendStoreBase = create<TSendFlowStore>()((set) => ({
  ...initialState,
  setField: <K extends keyof TSendFlowStoreItems>(
    field: K,
    value: TSendFlowStore[K]
  ) => set({ [field]: value } as Pick<TSendFlowStore, K>),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  handlePaste: async () => {
    const [err, text] = await to(getTextFromClipboard());
    if (!err && text) {
      set({ destinationAddress: text as Hex });
    }
  },
  clearStore: () => set(initialState),
}));

export const useSendStore = createSelectors(sendStoreBase);

export const useSend = () => {
  const currentStep = useSendStore.use.currentStep();
  const selectedWallet = useSendStore.use.selectedWallet();
  const selectedNetwork = useSendStore.use.selectedNetwork();
  const selectedAsset = useSendStore.use.selectedAsset();
  const amountToSend = useSendStore.use.amountToSend();
  const destinationAddress = useSendStore.use.destinationAddress();
  const setField = useSendStore.use.setField();
  const nextStep = useSendStore.use.nextStep();
  const prevStep = useSendStore.use.prevStep();
  const handlePaste = useSendStore.use.handlePaste();
  const clearStore = useSendStore.use.clearStore();

  return {
    currentStep,
    selectedWallet,
    selectedNetwork,
    selectedAsset,
    amountToSend,
    destinationAddress,
    setField,
    nextStep,
    prevStep,
    handlePaste,
    clearStore,
  };
};
