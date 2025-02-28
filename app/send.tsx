import React, { ReactElement, useEffect, useState } from 'react';
import {
  Button,
  Row,
  ScreenContainer,
  ScreenTitle,
  SelectCard,
  Typography,
} from '@shared/ui';
import { Layout } from '@ui-kitten/components';
import { Hex, isAddress } from 'viem';
import {
  SEND_STEPS,
  sendTransaction,
  useSend,
  useWallets,
} from '@entities/blockchain';
import {
  ConfirmTransactionStep,
  EnterAmountStep,
  SelectAssetStep,
  SelectNetworkStep,
  SelectRecipientStep,
  SelectWalletStep,
  TransactionSuccessful,
} from '@widgets/send-transaction';
import { AntDesign } from '@expo/vector-icons';
import { COLORS_MAP } from '@shared/config';
import to from 'await-to-js';
import { router } from 'expo-router';

const SendScreen = () => {
  const {
    currentStep,
    nextStep,
    prevStep,
    selectedWallet,
    selectedNetwork,
    selectedAsset,
    amountToSend,
    destinationAddress,
    clearStore,
  } = useSend();
  const { wallets } = useWallets();

  const [txHash, setTxHash] = useState('');
  const [isSending, setIsSending] = useState(false);

  const isFirstStep =
    wallets.length > 1
      ? currentStep === SEND_STEPS.SELECT_WALLET
      : currentStep === SEND_STEPS.SELECT_NETWORK;

  const isConfirmStep = currentStep === SEND_STEPS.CONFIRM_TRANSACTION;

  const isTransactionSuccessful =
    currentStep === SEND_STEPS.TRANSACTION_SUCCESSFUL;
  const isTransactionFailed = currentStep === SEND_STEPS.TRANSACTION_FAILED;

  const isLastStep = isTransactionSuccessful || isTransactionFailed;

  let stepComponent: ReactElement | null = null;
  let disableNextButton = false;

  switch (currentStep) {
    case SEND_STEPS.SELECT_WALLET:
      stepComponent = <SelectWalletStep />;
      disableNextButton = !selectedWallet;
      break;
    case SEND_STEPS.SELECT_NETWORK:
      stepComponent = <SelectNetworkStep />;
      disableNextButton = !selectedNetwork;
      break;
    case SEND_STEPS.SELECT_ASSET:
      stepComponent = <SelectAssetStep />;
      disableNextButton = !selectedAsset;
      break;
    case SEND_STEPS.ENTER_AMOUNT:
      stepComponent = <EnterAmountStep />;
      disableNextButton = !amountToSend || +amountToSend < 1;
      break;
    case SEND_STEPS.SELECT_RECIPIENT:
      stepComponent = <SelectRecipientStep />;
      disableNextButton = !isAddress(destinationAddress);
      break;
    case SEND_STEPS.CONFIRM_TRANSACTION:
      stepComponent = <ConfirmTransactionStep />;
      disableNextButton = true;
      break;
    case SEND_STEPS.TRANSACTION_FAILED:
      stepComponent = (
        <Typography status="danger">Transaction Failed!</Typography>
      );
      break;
    case SEND_STEPS.TRANSACTION_SUCCESSFUL:
      stepComponent = <TransactionSuccessful txHash={txHash as Hex} />;
      break;
    default:
      stepComponent = null;
  }

  const handleSendTransaction = async () => {
    if (!selectedWallet?.privateKey || !selectedAsset) return;

    setIsSending(true);

    const [err, txHash] = await to(
      sendTransaction({
        chain: selectedNetwork,
        asset: selectedAsset,
        privateKey: selectedWallet.privateKey,
        destinationAddress,
        amountToSend: +amountToSend,
      })
    );

    if (err) {
      setIsSending(false);
      throw err;
    }

    setTxHash(txHash);
    nextStep();
    setIsSending(false);
  };

  useEffect(() => {
    return () => {
      clearStore();
    };
  }, []);

  return (
    <ScreenContainer>
      <ScreenTitle title="Send" withBackButton />
      <SelectCard
        bgColor="color-basic-900"
        border="color-basic-700"
        className="bottom-20 my-auto"
        footer={
          <Layout>
            <Row className="gap-8">
              {!isLastStep && (
                <Button
                  disabled={isFirstStep}
                  className="flex-1 items-center"
                  appearance="outline"
                  onPress={prevStep}
                  accessoryLeft={
                    <AntDesign
                      name="left"
                      size={18}
                      color={
                        isFirstStep
                          ? COLORS_MAP['color-basic-100']
                          : COLORS_MAP['color-primary-500']
                      }
                    />
                  }
                >
                  Back
                </Button>
              )}
              {isLastStep ? (
                <>
                  {isTransactionSuccessful && (
                    <Button className="flex-1">View in explorer</Button>
                  )}
                  <Button
                    onPress={() => router.back()}
                    appearance="ghost"
                    className="flex-1"
                  >
                    Go back
                  </Button>
                </>
              ) : isConfirmStep ? (
                <Button
                  isLoading={isSending}
                  className="flex-1"
                  onPress={handleSendTransaction}
                >
                  Confirm
                </Button>
              ) : (
                <Button
                  disabled={disableNextButton}
                  className="flex-1"
                  onPress={nextStep}
                  accessoryRight={
                    <AntDesign
                      name="right"
                      size={18}
                      color={COLORS_MAP['color-basic-100']}
                    />
                  }
                >
                  Next
                </Button>
              )}
            </Row>
          </Layout>
        }
      >
        {stepComponent}
      </SelectCard>
    </ScreenContainer>
  );
};

export default SendScreen;
