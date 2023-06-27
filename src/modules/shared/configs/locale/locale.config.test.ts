import { localeDict } from './locale.config';

describe('locale configuration', () => {
  it('should have correct keys', () => {
    // ASSERT
    expect(Object.keys(localeDict)).toEqual(['en', 'id']);
  });
});
