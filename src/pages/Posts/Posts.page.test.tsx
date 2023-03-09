import { Route } from '@solidjs/router';
import { screen, waitFor } from '@solidjs/testing-library';
import { mockedCreateResource } from '../../mocks/module.mock';
import { renderProviders } from '../../utils/test.util';
import PostsPage from './Posts.page';

describe('PostsPage', () => {
  it('should render correctly', async () => {
    // ARRANGE
    const { container } = renderProviders(() => <Route path="/" component={PostsPage} />);

    // ASSERT
    await waitFor(() => {
      expect(mockedCreateResource).toHaveBeenCalled();
      expect(screen.getByText(/Add Post/)).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
