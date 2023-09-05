import { rest, server } from '@mocks/http/server.http';
import { getBaseUrl } from '@mocks/util.mock';
import { renderProviders } from '@shared/utils/test.util';
import { Route } from '@solidjs/router';
import { screen, waitFor } from '@solidjs/testing-library';
import TodosList from './TodosList.component';

describe('TodosList', () => {
  const loadingId = 'list-loading';

  // FIXME: TypeError: mutate is not a function
  it.todo('should render properly', () => {
    const view = renderProviders(() => <Route path="/" component={TodosList} />);
    expect(() => view).not.toThrow();
  });

  // FIXME: TypeError: mutate is not a function
  it.todo('should be able to query and show error alert', async () => {
    // ARRANGE
    server.use(
      rest.get(getBaseUrl('todos'), (_, res, ctx) =>
        res.once(ctx.status(500), ctx.json({ message: 'error' })),
      ),
    );

    // ASSERT
    expect(screen.queryByTestId(loadingId)).not.toBeInTheDocument();
    renderProviders(() => <Route path="/" component={TodosList} />);
    await waitFor(() => {
      // wait for appearance inside an assertion
      expect(screen.getByTestId(loadingId)).toBeInTheDocument();
    });
  });
});
