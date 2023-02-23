import { vi } from 'vitest';
import { generateRandomNumber, getDefaultLang, sleep } from './helper.util';

describe('sleep', () => {
  it('should suspends a thread for a specified number of milliseconds', async () => {
    // ARRANGE
    const ONE_SECOND = 1000;
    const before = Date.now();
    await sleep(ONE_SECOND);
    const after = Date.now();

    // ASSERT
    expect(after).toBeGreaterThanOrEqual(before + ONE_SECOND);
  });
});

describe('generateRandomNumber', () => {
  it('should generate number between 1-10', () => {
    // ARRANGE
    const randNumber = generateRandomNumber(1, 10);

    // ASSERT
    expect(randNumber).toBeGreaterThanOrEqual(1);
    expect(randNumber).toBeLessThanOrEqual(10);
  });
});

describe('getDefaultLang', () => {
  const spy = vi.spyOn(navigator, 'language', 'get');

  it('should return en', () => {
    spy.mockReturnValue('en-US');

    const lang = getDefaultLang();

    expect(lang).toEqual('en');
  });

  it('should return id', () => {
    spy.mockReturnValue('id-ID');

    const lang = getDefaultLang();

    expect(lang).toEqual('id');
  });

  it('should return en when the language is not supported', () => {
    // TODO: Change this if we support French
    spy.mockReturnValue('fr-FR');

    const lang = getDefaultLang();

    expect(lang).toEqual('en');
  });

  it('should return en when navigator.language returns empty string', () => {
    spy.mockReturnValue('');

    const lang = getDefaultLang();

    expect(lang).toEqual('en');
  });
});
