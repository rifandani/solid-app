import { Route } from '@solidjs/router';
import { waitFor } from '@solidjs/testing-library';
import { mockedCreateResource } from '../../mocks/module.mock';
import { renderWithRouter } from '../../utils/test.util';
import PostsPage from './Posts.page';

mockedCreateResource.mockReturnValueOnce([
  () => ({
    title: 'sunt aut',
    body: 'quia et',
    user: {
      name: 'Leanne Graham',
    },
  }),
]);

describe('PostsPage', () => {
  it('should render correctly', async () => {
    // ARRANGE
    const { container, getByText } = renderWithRouter(() => (
      <Route path="/" component={PostsPage} /> // the path doesn't matter here
    ));

    // ASSERT
    await waitFor(() => {
      expect(mockedCreateResource).toHaveBeenCalled();
      expect(getByText(/Post List/)).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
