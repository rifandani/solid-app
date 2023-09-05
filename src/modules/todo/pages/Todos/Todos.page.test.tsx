import { mockedCreateResource } from '@mocks/module.mock';
import { renderProviders } from '@shared/utils/test.util';
import { Route } from '@solidjs/router';
import { screen } from '@solidjs/testing-library';
import TodosPage from './Todos.page';

describe('TodosPage', () => {
  // FIXME: TypeError: mutate is not a function
  it.todo('should render correctly', () => {
    const view = renderProviders(() => <Route path="/" component={TodosPage} />);
    expect(() => view).not.toThrow();
  });

  // FIXME: TypeError: mutate is not a function
  it.todo('should render content roles correctly', () => {
    // ARRANGE
    renderProviders(() => <Route path="/" component={TodosPage} />);
    const title = screen.getByRole('heading', { level: 1 });

    // ASSERT
    expect(mockedCreateResource).toHaveBeenCalled();
    expect(title).toBeInTheDocument();
  });
});
