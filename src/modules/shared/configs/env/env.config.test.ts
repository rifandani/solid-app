import { env } from './env.config';

describe('env config', () => {
  it('should have a apiBaseUrl defined', () => {
    // ASSERT
    expect(env.apiBaseUrl).toBeDefined();
  });
});
