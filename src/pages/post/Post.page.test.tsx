import { Route } from '@solidjs/router';
import { waitFor } from '@solidjs/testing-library';
import { mockedRouteData } from '../../mocks/module.mock';
import { renderWithRouter } from '../../utils/test.util';
import PostPage from './Post.page';

// FIXME: the way `post` been called is `post()`
mockedRouteData.mockReturnValueOnce(() => [
  { name: 'Name', body: 'Body', email: 'Email' },
]);

describe('PostPage', () => {
  it('should render correctly', async () => {
    // ARRANGE
    const { container, getByText } = renderWithRouter(() => (
      <Route path="/" component={PostPage} /> // the path doesn't matter here
    ));

    // ASSERT
    await waitFor(() => {
      expect(mockedRouteData).toHaveBeenCalled();
      expect(getByText(/Post Detail/)).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
