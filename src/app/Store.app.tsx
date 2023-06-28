import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { ParentComponent } from 'solid-js';
import { localeDict } from '../modules/shared/configs/locale/locale.config';
import { LocaleDictLanguage } from '../modules/shared/configs/locale/locale.type';
import {
  AppStoreContext,
  createAppStoreContext,
} from '../modules/shared/hooks/useAppStore/useAppStore.hook';
import { I18nContext, createI18nContext } from '../modules/shared/hooks/usei18n/usei18n.hook';
import { AppStore } from '../modules/shared/types/store.type';

export const queryClient = new QueryClient();

// #region PROVIDERS
export const AppStoreProvider: ParentComponent<{
  store?: AppStore;
}> = (props) => {
  // eslint-disable-next-line solid/reactivity
  const value = createAppStoreContext(props.store);

  return <AppStoreContext.Provider value={value}>{props.children}</AppStoreContext.Provider>;
};

export const I18nProvider: ParentComponent<{
  dict?: Record<string, Record<string, unknown>>;
  locale?: LocaleDictLanguage;
}> = (props) => {
  // eslint-disable-next-line solid/reactivity
  const value = createI18nContext(props.dict, props.locale);

  return <I18nContext.Provider value={value}>{props.children}</I18nContext.Provider>;
};

export const QueryProvider: ParentComponent = (props) => (
  <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
);

export const AppRootProvider: ParentComponent = (props) => (
  <AppStoreProvider>
    <I18nProvider dict={localeDict}>
      <QueryProvider>{props.children}</QueryProvider>
    </I18nProvider>
  </AppStoreProvider>
);
// #endregion
