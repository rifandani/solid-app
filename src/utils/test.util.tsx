import { Router, Routes } from '@solidjs/router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@solidjs/testing-library';
import { AppProvider } from '../app/Store.app';

export const renderProviders = (
  ui: Parameters<typeof render>[0],
  options?: Parameters<typeof render>[1],
) =>
  render(ui, {
    wrapper: (props) => (
      <AppProvider>
        <Router>
          <Routes>{props.children}</Routes>
        </Router>
      </AppProvider>
    ),
    ...options,
  });

export default { renderProviders };
