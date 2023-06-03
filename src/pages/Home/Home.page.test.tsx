import { Route } from '@solidjs/router';
import { screen, waitFor } from '@solidjs/testing-library';
import { renderProviders } from '../../utils/test.util';
import HomePage from './Home.page';

describe('HomePage', () => {
  it('should render correctly', async () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={HomePage} />);

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(/Get Started/)).toBeInTheDocument();
    });
  });
});
