/* eslint-disable no-console */
import { Router, Routes } from '@solidjs/router';
import { render } from '@solidjs/testing-library';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { AppRootProvider } from '../../../app/Store.app';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {},
  },
});

export const renderProviders = (
  ui: Parameters<typeof render>[0],
  options?: Parameters<typeof render>[1],
) =>
  render(ui, {
    wrapper: (props) => (
      <AppRootProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>{props.children}</Routes>
          </Router>
        </QueryClientProvider>
      </AppRootProvider>
    ),
    ...options,
  });
