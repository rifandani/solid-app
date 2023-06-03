import { Route } from '@solidjs/router';
import { screen, waitFor } from '@solidjs/testing-library';
import { mockedParams, mockedRouteData } from '../../mocks/module.mock';
import { renderProviders } from '../../utils/test.util';
import PostPage from './Post.page';

/**
 * TypeError: mutate is not a function
 */
describe('PostPage', () => {
  it.skip('TODO: should render correctly', async () => {
    // ARRANGE
    mockedParams.mockReturnValueOnce({ id: 1 });
    mockedRouteData.mockImplementationOnce(() => [{ name: 'Name', body: 'Body', email: 'Email' }]);
    renderProviders(() => <Route path="/" component={PostPage} />);

    // ASSERT
    await waitFor(() => {
      expect(mockedRouteData).toHaveBeenCalled();
      expect(screen.getByText(/Post Detail/)).toBeInTheDocument();
    });
  });
});
