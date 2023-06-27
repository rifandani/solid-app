import { Route } from '@solidjs/router';
import { screen, waitFor } from '@solidjs/testing-library';
import { mockedCreateResource } from '../../../../mocks/module.mock';
import { renderProviders } from '../../../shared/utils/test.util';
import TodosPage from './Todos.page';

describe('TodosPage', () => {
  it('should render correctly', async () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={TodosPage} />);

    // ASSERT
    await waitFor(() => {
      expect(mockedCreateResource).toHaveBeenCalled();
      expect(screen.getByText(/Todo List/)).toBeInTheDocument();
    });
  });
});
