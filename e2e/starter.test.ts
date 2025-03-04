import { by, device, element, waitFor } from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
    });
    await element(by.text('http://localhost:8081')).tap();
    await element(by.text('Continue')).tap();
    await device.tap({ x: 20, y: 100 });
  });

  it('should import wallet successfully', async () => {
    await element(by.id('go-to-import')).tap();
    await element(by.id('insert-seed-phrase-btn')).tap();
    await element(by.id('import-btn')).tap();

    await waitFor(element(by.text('Total balance')))
      .toBeVisible()
      .withTimeout(10000);

    await device.terminateApp();
  });

  it('should create wallet successfully', async () => {
    await device.launchApp();

    await element(by.id('createWalletBtn')).tap();
    await waitFor(element(by.text('Total balance')))
      .toBeVisible()
      .withTimeout(10000);

    await device.terminateApp();
  });
});
