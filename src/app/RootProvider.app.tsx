import { Toast } from '@kobalte/core';
import { localeDict } from '@shared/configs/locale/locale.config';
import { LocaleDictLanguage } from '@shared/configs/locale/locale.type';
import { AppStoreContext, createAppStoreContext } from '@shared/hooks/useAppStore/useAppStore.hook';
import { I18nContext, createI18nContext } from '@shared/hooks/usei18n/usei18n.hook';
import { AppStore } from '@shared/types/store.type';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { ParentComponent } from 'solid-js';
import { Portal } from 'solid-js/web';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1_000 * 30, // 30 secs. This will be the default in v5
    },
  },
});

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

export const RootProvider: ParentComponent = (props) => (
  <AppStoreProvider>
    <I18nProvider dict={localeDict}>
      <QueryProvider>
        {/* toast with portal */}
        <Portal>
          <Toast.Region duration={3_000} pauseOnInteraction swipeDirection="right">
            <Toast.List class="toast toast-end z-20" />
          </Toast.Region>
        </Portal>

        {props.children}
      </QueryProvider>
    </I18nProvider>
  </AppStoreProvider>
);
// #endregion
