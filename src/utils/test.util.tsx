import { Router, Routes } from '@solidjs/router';
import { render } from '@solidjs/testing-library';

export const renderWithRouter = (
  ui: Parameters<typeof render>[0],
  options?: Parameters<typeof render>[1],
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <Router>
        <Routes>{children}</Routes>
      </Router>
    ),
    ...options,
  });
};
