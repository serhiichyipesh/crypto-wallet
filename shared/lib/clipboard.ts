import * as Clipboard from 'expo-clipboard';

export const copyToClipboard = async (stringToSet: string) => {
  await Clipboard.setStringAsync(stringToSet);
};

export const getTextFromClipboard = async () => {
  return await Clipboard.getStringAsync();
};
