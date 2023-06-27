import { Route } from '@solidjs/router';
import { screen, waitFor } from '@solidjs/testing-library';
import { mockedParams, mockedRouteData } from '../../../../mocks/module.mock';
import { renderProviders } from '../../../shared/utils/test.util';
import TodoPage from './Todo.page';

/**
 * TypeError: mutate is not a function
 */
describe('TodoPage', () => {
  it.skip('TODO: should render correctly', async () => {
    // ARRANGE
    mockedParams.mockReturnValueOnce({ id: 1 });
    mockedRouteData.mockImplementationOnce(() => [{ name: 'Name', body: 'Body', email: 'Email' }]);
    renderProviders(() => <Route path="/" component={TodoPage} />);

    // ASSERT
    await waitFor(() => {
      expect(mockedRouteData).toHaveBeenCalled();
      expect(screen.getByText(/Todo Detail/)).toBeInTheDocument();
    });
  });
});
