import { Route } from '@solidjs/router';
import { screen, waitFor } from '@solidjs/testing-library';
import { renderProviders } from '../../utils/test.util';
import PostAddPage from './PostAdd.page';

describe('PostAddPage', () => {
  it('should render correctly', async () => {
    // ARRANGE
    const { container } = renderProviders(() => <Route path="/" component={PostAddPage} />);

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(/Add Post/)).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
