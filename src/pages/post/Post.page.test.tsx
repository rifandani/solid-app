import { Route } from '@solidjs/router';
import { screen, waitFor } from '@solidjs/testing-library';
import { mockedRouteData } from '../../mocks/module.mock';
import { renderProviders } from '../../utils/test.util';
import PostPage from './Post.page';

describe('PostPage', () => {
  it('should render correctly', async () => {
    // ARRANGE
    mockedRouteData.mockImplementationOnce(() => [{ name: 'Name', body: 'Body', email: 'Email' }]);
    const { container } = renderProviders(() => <Route path="/" component={PostPage} />);

    // ASSERT
    await waitFor(() => {
      expect(mockedRouteData).toHaveBeenCalled();
      expect(screen.getByText(/Delete Post/)).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
