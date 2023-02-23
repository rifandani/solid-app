import { Route } from '@solidjs/router';
import { screen, waitFor } from '@solidjs/testing-library';
import { mockedCreateResource } from '../../mocks/module.mock';
import { renderProviders } from '../../utils/test.util';
import TodoPage from './Todo.page';

describe('TodoPage', () => {
  it('should render correctly', async () => {
    // ARRANGE
    const { container } = renderProviders(() => <Route path="/" component={TodoPage} />);

    // ASSERT
    await waitFor(() => {
      expect(mockedCreateResource).toHaveBeenCalled();
      expect(screen.getByText(/Todo List/)).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
