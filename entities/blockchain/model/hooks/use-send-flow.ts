import { useState } from 'react';
import {
  BLOCKCHAIN_CONFIG,
  SEND_STEPS,
  TSupportedAssetTestnet,
  TSupportedChainTestnet,
  useWallets,
} from '@entities/blockchain';
import { getTextFromClipboard } from '@shared/lib';
import { Address, isAddress } from 'viem';
import to from 'await-to-js';

export function useSendFlow() {
  const { wallets } = useWallets();

  const initialStep =
    wallets.length > 1 ? SEND_STEPS.SELECT_WALLET : SEND_STEPS.SELECT_NETWORK;

  const networksToChooseFrom = BLOCKCHAIN_CONFIG.SUPPORTED_CHAINS_TESTNET;

  const [state, setState] = useState({
    currentStep: initialStep,
    selectedWallet: wallets[0] || null,
    selectedNetwork: networksToChooseFrom[0] as TSupportedChainTestnet,
    selectedAsset: null as TSupportedAssetTestnet | null,
    amountToSend: '',
    destinationAddress: '' as Address,
  });

  // ----- Step navigation -----
  const nextStep = () => {
    setState((prev) => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  const prevStep = () => {
    setState((prev) => ({
      ...prev,
      currentStep: prev.currentStep - 1,
    }));
  };

  // ----- Clipboard paste -----
  const handlePaste = async () => {
    const [err, text] = await to(getTextFromClipboard());
    if (!err && text) {
      setState((prev) => ({ ...prev, destinationAddress: text as Address }));
    }
  };

  // ----- Validations -----
  const doesEnteredAddress = state.destinationAddress.length > 0;
  const isSelectedAddressValid = isAddress(state.destinationAddress);
  const showAddressErr = doesEnteredAddress && !isSelectedAddressValid;

  // ----- Utility booleans -----
  const isInitialStep = state.currentStep === initialStep;
  const isFinalStep = state.currentStep === SEND_STEPS.CONFIRM_TRANSACTION;

  return {
    ...state,
    setState, // so we can manually set fields if needed
    nextStep,
    prevStep,
    handlePaste,
    doesEnteredAddress,
    isSelectedAddressValid,
    showAddressErr,
    isInitialStep,
    isFinalStep,
  };
}
