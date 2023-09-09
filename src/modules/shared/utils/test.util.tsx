import { AppStoreProvider, I18nProvider } from '@app/RootProvider.app';
import { localeDict } from '@shared/configs/locale/locale.config';
import { Router, Routes } from '@solidjs/router';
import { render } from '@solidjs/testing-library';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

export const renderProviders = (
  ui: Parameters<typeof render>[0],
  options?: Parameters<typeof render>[1],
) =>
  render(ui, {
    wrapper: (props) => (
      <AppStoreProvider>
        <I18nProvider dict={localeDict}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <Routes>{props.children}</Routes>
            </Router>
          </QueryClientProvider>
        </I18nProvider>
      </AppStoreProvider>
    ),
    ...options,
  });
