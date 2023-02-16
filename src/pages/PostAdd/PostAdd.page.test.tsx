import { Route } from '@solidjs/router';
import { waitFor } from '@solidjs/testing-library';
import { renderWithRouter } from '../../utils/test.util';
import PostAddPage from './PostAdd.page';

describe('PostAddPage', () => {
  it('should render correctly', async () => {
    // ARRANGE
    const { container, getByText } = renderWithRouter(() => (
      <Route path="/" component={PostAddPage} /> // the path doesn't matter here
    ));

    // ASSERT
    await waitFor(() => {
      expect(getByText(/Add Post/)).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
