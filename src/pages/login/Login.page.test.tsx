import { Route } from '@solidjs/router';
import { waitFor } from '@solidjs/testing-library';
import { vi } from 'vitest';
import { renderWithRouter } from '../../utils/test.util';
import LoginPage from './Login.page';

vi.spyOn(localStorage, 'getItem');
localStorage.getItem = vi.fn(() => 'user');

describe('LoginPage', () => {
  it('should render correctly', async () => {
    // ARRANGE
    const { container, getByText } = renderWithRouter(() => (
      <Route path="/" component={LoginPage} /> // the path doesn't matter here
    ));

    // ASSERT
    await waitFor(() => {
      expect(getByText(/Welcome Back/)).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
