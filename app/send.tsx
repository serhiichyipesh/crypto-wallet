import {
  Button,
  Row,
  ScreenContainer,
  ScreenTitle,
  Typography,
} from '@shared/ui';
import React, { useState } from 'react';
import {
  BLOCKCHAIN_CONFIG,
  SEND_STEPS,
  trimHex,
  TSupportedChainTestnet,
  TWallet,
  useBalances,
  useWallets,
} from '@entities/blockchain';
import { FlatList, View } from 'react-native';
import { Card, Input, Layout } from '@ui-kitten/components';
import {
  SELECTED_CURRENCY,
  SELECTED_CURRENCY_RATE,
  SELECTED_CURRENCY_SIGN,
} from '@shared/config';

const SendScreen = () => {
  const { wallets } = useWallets();
  const { getTokenToSend, walletsBalances } = useBalances();

  const initialStep =
    wallets.length > 1 ? SEND_STEPS.SELECT_WALLET : SEND_STEPS.SELECT_NETWORK;

  const networksToChooseFrom = BLOCKCHAIN_CONFIG.SUPPORTED_CHAINS_TESTNET;

  const [currentStep, setCurrentStep] = useState(initialStep);

  const [selectedWallet, setSelectedWallet] = useState<TWallet>(wallets[0]);
  const [selectedNetwork, setSelectedNetwork] =
    useState<TSupportedChainTestnet>(networksToChooseFrom[0]);

  const assetsToChooseFrom = Object.values(
    BLOCKCHAIN_CONFIG.SUPPORTED_ASSETS[selectedNetwork.id]
  );

  const [selectedAsset, setSelectedAsset] = useState(assetsToChooseFrom[0]);

  const [amountToSend, setAmountToSend] = useState('');

  const balance = getTokenToSend({
    walletAddress: selectedWallet.address,
    networkId: selectedNetwork.id,
    assetSymbol: selectedAsset.symbol,
  });

  const contentByStepMap = {
    [SEND_STEPS.SELECT_WALLET]: {
      content: (
        <>
          <Typography category="h6">Select Wallet</Typography>
          <FlatList
            data={wallets}
            contentContainerClassName="gap-2 mt-4"
            renderItem={({ item }) => (
              <Card
                onPress={() => setSelectedWallet(item)}
                status={selectedWallet === item ? 'primary' : undefined}
              >
                <Row className="item-center justify-between">
                  <View>
                    <Typography>{item.name}</Typography>
                    <Typography>{trimHex(item.address)}</Typography>
                  </View>

                  <Typography category="h6" className="my-auto">
                    {SELECTED_CURRENCY_SIGN}
                    {String(
                      walletsBalances?.[item.address].totalBalanceUsd || 0
                    )}
                  </Typography>
                </Row>
              </Card>
            )}
          />
        </>
      ),
      disableNextButton: !selectedWallet,
    },
    [SEND_STEPS.SELECT_NETWORK]: {
      content: (
        <>
          <Typography category="h6">Select Network</Typography>
          <FlatList
            data={networksToChooseFrom}
            contentContainerClassName="gap-2 mt-4"
            renderItem={({ item }) => (
              <Card
                onPress={() => setSelectedNetwork(item)}
                status={selectedNetwork === item ? 'primary' : undefined}
              >
                <Typography category="s1">{item.name}</Typography>
              </Card>
            )}
          />
        </>
      ),
      disableNextButton: !selectedNetwork,
    },
    [SEND_STEPS.SELECT_ASSET]: {
      content: (
        <>
          <Typography category="h6">Select Assets</Typography>
          <FlatList
            data={assetsToChooseFrom}
            contentContainerClassName="gap-2 mt-4"
            renderItem={({ item }) => {
              const balance = getTokenToSend({
                walletAddress: selectedWallet.address,
                networkId: selectedNetwork.id,
                assetSymbol: item.symbol,
              });
              return (
                <Card
                  status={item === selectedAsset ? 'primary' : undefined}
                  onPress={() => setSelectedAsset(item)}
                >
                  <Row className="items-center justify-between">
                    <Typography category="s1">{item.symbol}</Typography>

                    <View>
                      <Typography category="s1">
                        {balance?.balanceUsd}
                      </Typography>
                      <Typography>
                        {SELECTED_CURRENCY_SIGN}
                        {(balance?.balanceUsd || 0) * SELECTED_CURRENCY_RATE}
                      </Typography>
                    </View>
                  </Row>
                </Card>
              );
            }}
          />
        </>
      ),
      disableNextButton: !selectedAsset,
    },
    [SEND_STEPS.ENTER_AMOUNT]: {
      content: (
        <>
          <Row className="mb-4">
            <Typography category="h6">
              Balance:{' '}
              {String((balance?.balanceUsd || 0) * SELECTED_CURRENCY_RATE)}{' '}
              {SELECTED_CURRENCY}
            </Typography>
          </Row>

          <Row className="items-center gap-4">
            <View className="flex flex-1">
              <Input
                value={amountToSend}
                onChangeText={setAmountToSend}
                className="flex flex-grow"
                placeholder="Enter amount"
              />
            </View>

            <Button
              size="small"
              onPress={() => setAmountToSend(String(balance?.balanceUsd))}
            >
              MAX
            </Button>
          </Row>
        </>
      ),
      disableNextButton: true,
    },
    [SEND_STEPS.SELECT_RECIPIENT]: {
      content: <Typography>Select Recipient</Typography>,
      disableNextButton: true,
    },
    [SEND_STEPS.CONFIRM_TRANSACTION]: {
      content: <Typography>Select Confirm Transactions</Typography>,
      disableNextButton: true,
    },
  };

  const isFinalStep = currentStep === SEND_STEPS.CONFIRM_TRANSACTION;
  const isInitialStep = currentStep === initialStep;

  const { content, disableNextButton } = contentByStepMap[currentStep];

  return (
    <ScreenContainer>
      <ScreenTitle title="Send" withBackButton />

      <Card
        className="bottom-20 my-auto"
        footer={
          <Layout>
            <Row className="gap-24 px-4">
              <Button
                disabled={isInitialStep}
                className="flex-1"
                appearance="outline"
                onPress={() => setCurrentStep((prev) => prev - 1)}
              >
                Back
              </Button>

              {!isFinalStep && (
                <Button
                  disabled={disableNextButton}
                  className="flex-1"
                  onPress={() => setCurrentStep((prev) => prev + 1)}
                >
                  Next
                </Button>
              )}
            </Row>
          </Layout>
        }
      >
        {content}
      </Card>
    </ScreenContainer>
  );
};

export default SendScreen;
