import { Route } from '@solidjs/router';
import { screen, waitFor } from '@solidjs/testing-library';
import { vi } from 'vitest';
import { renderProviders } from '../../utils/test.util';
import LoginPage from './Login.page';

describe('LoginPage', () => {
  const getItemSpy = vi.spyOn(localStorage, 'getItem');
  localStorage.getItem = vi.fn(() => 'user');

  afterEach(() => {
    getItemSpy.mockClear(); // clear call history
    localStorage.clear();
  });

  it('should render correctly', async () => {
    // ARRANGE
    const { container } = renderProviders(() => <Route path="/" component={LoginPage} />);

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(/Welcome Back/)).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
