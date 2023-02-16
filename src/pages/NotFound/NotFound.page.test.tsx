import { Route } from '@solidjs/router';
import { waitFor } from '@solidjs/testing-library';
import { renderWithRouter } from '../../utils/test.util';
import NotFoundPage from './NotFound.page';

describe('NotFoundPage', () => {
  it('should render correctly', async () => {
    // ARRANGE
    const { container, getByText } = renderWithRouter(() => (
      <Route path="/" component={NotFoundPage} /> // the path doesn't matter here
    ));

    // ASSERT
    await waitFor(() => {
      expect(getByText(/404: Not Found/)).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
