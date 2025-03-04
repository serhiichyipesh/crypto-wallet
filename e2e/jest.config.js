/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.(ts|tsx)'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
  moduleNameMapper: {
    '^@entities/blockchain$': '<rootDir>/entities/blockchain$1',
    '^expo-secure-store$': '<rootDir>/__mocks__/expo-secure-store.js',
    '^expo-modules-core$': '<rootDir>/__mocks__/expo-modules-core.js',
    '^expo-clipboard$': '<rootDir>/__mocks__/expo-clipboard.js',
    '^@shared/lib(.*)$': '<rootDir>/shared/lib$1',
    '^shared/lib(.*)$': '<rootDir>/shared/lib$1',
    '^shared/config(.*)$': '<rootDir>/shared/config$1',
    '^@shared/config(.*)$': '<rootDir>/shared/config$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*(uuid|@react-native|react-native|@react-native/js-polyfills|expo-modules-core|expo|@ethersproject/shims|@ui-kitten/components|@react-navigation/elements|@storybook/addon-actions).*)',
  ],
  setupFiles: ['<rootDir>/e2e/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/e2e/setup.js'],
};
