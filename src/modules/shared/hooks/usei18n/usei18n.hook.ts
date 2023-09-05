import { deepReadObject, template } from '@rifandani/nxact-yutiriti';
import { Interpolate, LocaleDictLanguage, Translations } from '@shared/configs/locale/locale.type';
import { createContext, createSignal, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

/**
 * This creates a I18nContext.
 * It's extracted into a function to be able to type the Context before it's even initialized.
 *
 * @param [init={}] {Record<string, Record<string, any>>} - Initial dictionary of languages
 * @param [lang=navigator.language] {string} - The default language fallback to browser language if not set
 */
export const createI18nContext = (
  init: Record<string, Record<string, unknown>> = {},
  lang: string = navigator.language in init ? navigator.language : Object.keys(init)[0],
) => {
  const [locale, setLocale] = createSignal(lang);
  const [dict, setDict] = createStore(init);

  /**
   * The main translation function of the library, given a key, it will look into its
   * dictionnaries to find th right translationb for that key and fallback to the default
   * translation provided in last argument (if provided).
   *
   * You can additionally give as a second arguments dynamic parameters to inject into the
   * the translation.
   *
   * @param key {string} - The key to look translation for
   * @param [params] {Record<string, string>} - Parameters to pass into the translation template
   * @param [defaultValue] {string} - Default value if the translation isn't found
   *
   * @returns {string} - The translated string
   *
   * @example
   * ```tsx
   * const [t] = useI18n();
   *
   * const dict = { fr: 'Bonjour {{name}} !' }
   *
   * t('hello', { name: 'John' }, 'Hello, {{name}}!');
   * locale('fr')
   * // => 'Bonjour John !'
   * locale('unknown')
   * // => 'Hello, John!'
   * ```
   */
  const translate = <T extends keyof Translations, Payload = Interpolate<T>>(
    ...args: keyof Payload extends never
      ? [translation: T]
      : [translation: T, payload: Interpolate<T>]
  ): string => {
    const [key, params] = args;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const val = deepReadObject(dict[locale()], key); // we can pass `defaultValue` as third parameter

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    if (typeof val === 'function') return val(params);
    if (typeof val === 'string') return template(val, params || {});

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return val;
  };

  const actions = {
    /**
     * Add (or edit an existing) locale
     *
     * @param lang {string} - The locale to add or edit
     * @param table {Record<string, any>} - The dictionary
     *
     * @example
     * ```js
     * const [_, { add }] = useI18n();
     *
     * const addSwedish = () => add('sw', { hello: 'Hej {{name}}' })
     * ```
     */
    add(_lang: string, table: Record<string, unknown>) {
      setDict(_lang, (t) => Object.assign(t || {}, table));
    },
    /**
     * Switch to the language in the parameters.
     *
     * @example
     *
     * ```js
     * const [_, { locale }] = useI18n();
     *
     * locale()
     * // => 'en'
     * locale('id')
     * locale()
     * // => 'id'
     *
     * ```
     */
    locale: (_lang?: LocaleDictLanguage) => (_lang ? setLocale(_lang) : locale()),
    /**
     * Retrieve the dictionary of a language
     *
     * @param lang {string} - The language to retrieve from
     * @returns dict {Record<string, Record<string, unknown>>}
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    dict: (_lang: string) => deepReadObject(dict, _lang),
  };

  return [translate, actions] as const;
};

export type I18nContextInterface = ReturnType<typeof createI18nContext>;

export const I18nContext = createContext<I18nContextInterface>({} as I18nContextInterface);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n: cannot find the I18nContext');
  }

  return context;
};
