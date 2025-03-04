require('dotenv').config();

module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!.*(expo-secure-store|uuid|@react-native|react-native|@react-native/js-polyfills|expo-modules-core|expo|@ethersproject/shims|@ui-kitten/components|@react-navigation/elements|@storybook/addon-actions).*)',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^shared/lib(.*)$': '<rootDir>/shared/lib$1',
    '\\.css$': 'identity-obj-proxy',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
};
