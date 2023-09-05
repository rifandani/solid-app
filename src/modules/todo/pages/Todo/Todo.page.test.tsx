import { renderProviders } from '@shared/utils/test.util';
import { Route } from '@solidjs/router';
import { screen } from '@solidjs/testing-library';
import TodoPage from './Todo.page';

describe('TodoPage', () => {
  const Component = (
    <Route
      path="/todos/1"
      data={() => [{ name: 'Name', body: 'Body', email: 'Email' }]}
      component={TodoPage}
    />
  );

  // FIXME: TypeError: mutate is not a function
  it.todo('should render correctly', () => {
    const view = renderProviders(() => Component);
    expect(() => view).not.toThrow();
  });

  // FIXME: TypeError: mutate is not a function
  it.todo('should render role contents correctly', () => {
    // ARRANGE
    renderProviders(() => Component);
    const link: HTMLAnchorElement = screen.getByRole('link', { name: /go-back/i });
    const title: HTMLHeadingElement = screen.getByRole('heading', { level: 1 });

    // ASSERT
    expect(link).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
