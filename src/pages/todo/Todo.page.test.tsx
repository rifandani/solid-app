import { Route } from '@solidjs/router';
import { waitFor } from '@solidjs/testing-library';
import { mockedCreateResource } from '../../mocks/module.mock';
import { renderWithRouter } from '../../utils/test.util';
import TodoPage from './Todo.page';

mockedCreateResource.mockReturnValueOnce([
  () => ({
    userId: 1,
    title: 'test todo 1',
    completed: false,
    id: 201,
  }),
  { refetch: () => {} },
]);

describe('TodoPage', () => {
  it('should render correctly', async () => {
    // ARRANGE
    const { container, getByText } = renderWithRouter(() => (
      <Route path="/" component={TodoPage} /> // the path doesn't matter here
    ));

    // ASSERT
    await waitFor(() => {
      expect(mockedCreateResource).toHaveBeenCalled();
      expect(getByText(/Todo List/)).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
