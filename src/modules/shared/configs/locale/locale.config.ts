import { authEnLocale, authIdLocale } from './auth.locale';
import { commonEnLocale, commonIdLocale } from './common.locale';
import { homeEnLocale, homeIdLocale } from './home.locale';
import { LocaleDict } from './locale.type';
import { playgroundEnLocale, playgroundIdLocale } from './playground.locale';
import { todoEnLocale, todoIdLocale } from './todo.locale';

export const enLocale = {
  ...commonEnLocale,
  ...authEnLocale,
  ...playgroundEnLocale,
  ...homeEnLocale,
  ...todoEnLocale,
} as const;

export const idLocale = {
  ...commonIdLocale,
  ...authIdLocale,
  ...playgroundIdLocale,
  ...homeIdLocale,
  ...todoIdLocale,
} as const;

export const localeDict: LocaleDict = {
  en: enLocale,
  id: idLocale,
} as const;
