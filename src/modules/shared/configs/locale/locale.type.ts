import { enUSLocale } from './locale.config';

export type LocaleDictLanguage = 'en-US' | 'id';
export type LocaleDict = Record<LocaleDictLanguage, Record<string, string>>;

export type Translations = typeof enUSLocale;
export type InterpolateInner<
  S extends string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  U extends object = {},
> = S extends `${string}{{${infer V}}}${infer Rest}`
  ? InterpolateInner<Rest, U & { [key in V]: string }>
  : U;

export type Interpolate<S extends keyof Translations> = InterpolateInner<Translations[S]>;
