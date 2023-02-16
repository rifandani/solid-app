import { Route } from '@solidjs/router';
import { waitFor } from '@solidjs/testing-library';
import { renderWithRouter } from '../../utils/test.util';
import HomePage from './Home.page';

describe('HomePage', () => {
  it('should render correctly', async () => {
    // ARRANGE
    const { container, getByText } = renderWithRouter(() => (
      <Route path="/" component={HomePage} />
    ));

    // ASSERT
    await waitFor(() => {
      expect(getByText(/Get Started/)).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
