import { appStore, setAppStore } from '../../app/Store.app';
import { localeConfig } from '../../configs/locale/locale.config';
import { Availability, Lang } from '../../configs/locale/locale.type';

/**
 * Hooks to translate and change the language
 */
function useTranslator(locales: Lang[] = localeConfig) {
  // translate text from one language to another
  const translate = (key: string, unique?: string) => {
    const langMap =
      locales.find((locale) => (unique ? locale.unique === unique : locale.en === key)) ??
      locales.find((locale) => locale.en === key);

    if (langMap && langMap[appStore.setting.currentLanguage] !== null) {
      return langMap[appStore.setting.currentLanguage];
    }

    // return back passed `key`
    return key;
  };

  // change language based on input params
  const changeLanguage = (language: Availability | ((_language: Availability) => Availability)) => {
    setAppStore('setting', 'currentLanguage', (lang) =>
      language instanceof Function ? language(lang) : language || Availability.en,
    );
  };

  return {
    translate,
    changeLanguage,
  };
}

export default useTranslator;
