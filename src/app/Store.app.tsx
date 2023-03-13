import { ParentComponent } from 'solid-js';
import { localeDict } from '../configs/locale/locale.config';
import { LocaleDictLanguage } from '../configs/locale/locale.type';
import { AppStoreContext, createAppStoreContext } from '../hooks/useAppStore/useAppStore.hook';
import { createI18nContext, I18nContext } from '../hooks/usei18n/usei18n.hook';
import { AppStore } from '../types/store.type';

// #region PROVIDERS
export const I18nProvider: ParentComponent<{
  dict?: Record<string, Record<string, unknown>>;
  locale?: LocaleDictLanguage;
}> = (props) => {
  // eslint-disable-next-line solid/reactivity
  const value = createI18nContext(props.dict, props.locale);

  return <I18nContext.Provider value={value}>{props.children}</I18nContext.Provider>;
};

export const AppStoreProvider: ParentComponent<{
  store?: AppStore;
}> = (props) => {
  // eslint-disable-next-line solid/reactivity
  const value = createAppStoreContext(props.store);

  return <AppStoreContext.Provider value={value}>{props.children}</AppStoreContext.Provider>;
};

export const RootProvider: ParentComponent = (props) => (
  <AppStoreProvider>
    <I18nProvider dict={localeDict}>{props.children}</I18nProvider>
  </AppStoreProvider>
);
// #endregion
