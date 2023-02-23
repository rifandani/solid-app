import { localeConfig } from './locale.config';

describe('locale configuration', () => {
  it('should have correct keys', () => {
    localeConfig.forEach((translation) => {
      // ASSERT
      expect(Object.keys(translation)).toEqual(['en', 'id']);
    });
  });
});
