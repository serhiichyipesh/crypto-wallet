import { getPrivateKey } from './get-private-key';

describe('getPrivateKey', () => {
  it('should return private key', () => {
    const privateKey = getPrivateKey(new Uint8Array());

    expect(typeof privateKey).toEqual('string');
    expect(privateKey.startsWith('0x')).toBe(true);
  });
});
