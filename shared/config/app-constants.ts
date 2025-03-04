// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const MIN_WALLET_NAME_LENGTH = 3;
export const MAX_WALLET_NAME_LENGTH = 10;

export const OPEN_STORYBOOK = false;
export const SELECTED_CURRENCY = 'USD';
export const SELECTED_CURRENCY_SIGN = '$';
export const SELECTED_CURRENCY_RATE = 1;
export const NETWORK_FEE = 0.001;

export const API_URL = process.env.EXPO_PUBLIC_PIMLICO_API_URL;
export const API_KEY = process.env.EXPO_PUBLIC_PIMLICO_API_KEY;
export const TEST_MNEMONIC = process.env.EXPO_PUBLIC_TEST_MNEMONIC;
export const TEST_WALLET = process.env.EXPO_PUBLIC_TEST_WALLET;
export const TEST_PRIVATE_KEY = process.env.EXPO_PUBLIC_TEST_PRIVATE_KEY;
export const TEST_DESTINATION_WALLET =
  process.env.EXPO_PUBLIC_TEST_DESTINATION_WALLET;
export const TEST_HASH = '0x1231231231231231231231';
export const IS_DETOX_ENV = true;
