import { Route } from '@solidjs/router';
import { screen, waitFor } from '@solidjs/testing-library';
import { renderProviders } from '../../../shared/utils/test.util';
import NotFoundPage from './NotFound.page';

describe('NotFoundPage', () => {
  it('should render correctly', async () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={NotFoundPage} />);

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(/404: Not Found/)).toBeInTheDocument();
    });
  });
});
