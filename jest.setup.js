jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native-gesture-handler', () => {
  return require('react-native-gesture-handler/jestSetup');
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

if (typeof require.context !== 'function') {
  require.context = (directory, useSubdirectories, regExp) => {
    const keys = () => [];
    keys.keys = () => [];
    return keys;
  };
}

jest.mock('expo-font', () => ({
  loadAsync: jest.fn().mockResolvedValueOnce(void 0),
  useFonts: () => [true],
  isLoaded: () => true,
}));
