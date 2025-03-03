import { trimHex } from './trim-hex';

const trimStart = 7;
const trimEnd = 7;
const dotsLength = 3;

const lengthAfterTrim = trimStart + dotsLength + trimEnd;

describe('trimHex string', () => {
  it('should trim hex string', () => {
    const inputString =
      '0x1234123321232131231212312312312312323131233123123123';
    const string = trimHex(inputString, trimStart, trimEnd);

    expect(string.length).toBe(lengthAfterTrim);
    expect(string).not.toBe(inputString);
  });

  it('should return input string', () => {
    const inputString = '0x12325';
    const string = trimHex('0x12325', trimStart, trimEnd);

    expect(string.length).toBe(inputString.length);
    expect(string).toBe(inputString);
  });
});
