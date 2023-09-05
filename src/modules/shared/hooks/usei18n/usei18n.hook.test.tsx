import { localeDict } from '@shared/configs/locale/locale.config';
import { createRoot } from 'solid-js';
import { describe } from 'vitest';
import { createI18nContext } from './usei18n.hook';

describe('createI18nContext', () => {
  it('should be able to switch locale', () => {
    const [t, { add, locale }] = createRoot(() => createI18nContext(localeDict, 'en'));
    Object.entries(localeDict).forEach(([lang, translations]) => add(lang, translations));

    locale('en');
    expect(t('xList', { feature: 'Post' })).toBe('Post List');

    locale('id');
    expect(t('xList', { feature: 'Post' })).toBe('Daftar Post');
  });
});
