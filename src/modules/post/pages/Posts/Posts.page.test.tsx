import { Route } from '@solidjs/router';
import { screen, waitFor } from '@solidjs/testing-library';
import { mockedCreateResource } from '../../../../mocks/module.mock';
import { renderProviders } from '../../../shared/utils/test.util';
import PostsPage from './Posts.page';

/**
 * TypeError: mutate is not a function
 */
describe('PostsPage', () => {
  it.skip('TODO: should render correctly', async () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={PostsPage} />);

    // ASSERT
    await waitFor(() => {
      expect(mockedCreateResource).toHaveBeenCalled();
      expect(screen.getByText(/Add Post/)).toBeInTheDocument();
    });
  });
});
