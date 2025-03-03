import { trimHex } from './trim-hex';
import { TEST_WALLET } from '@shared/config';

const trimStart = 7;
const trimEnd = 7;
const dotsLength = 3;

const lengthAfterTrim = trimStart + dotsLength + trimEnd;

describe('trimHex string', () => {
  it('should trim hex string', () => {
    const string = trimHex(TEST_WALLET, trimStart, trimEnd);

    expect(string.length).toBe(lengthAfterTrim);
    expect(string).not.toBe(TEST_WALLET);
  });

  it('should return input string', () => {
    const inputString = '0x12325';
    const string = trimHex('0x12325', trimStart, trimEnd);

    expect(string.length).toBe(inputString.length);
    expect(string).toBe(inputString);
  });
});
