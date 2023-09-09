import { queryClient } from '@app/RootProvider.app';
import { ResourceParamsSchema } from '@shared/api/api.schema';
import { RouteDataFuncArgs } from '@solidjs/router';
import { todoApi, todoKeys } from '@todo/api/todo.api';
import { TodoListApiResponseSchema } from '@todo/api/todo.schema';
import { defaultLimit } from '@todo/constants/todos.constant';
import { SetRequired } from 'type-fest';

const routeDataTodos =
  (_queryClient: typeof queryClient) =>
  async ({ location }: RouteDataFuncArgs) => {
    const search = new URLSearchParams(location.search);
    const searchParams = Object.fromEntries(search);
    const params: SetRequired<ResourceParamsSchema, 'limit'> = {
      ...searchParams,
      limit: Number(searchParams?.limit ?? defaultLimit),
    };
    const queryKey = todoKeys.list(params);
    const queryFn = () => todoApi.list(params);
    const staleTime = 1_000 * 60 * 1; // 1 min

    // or we can use `_queryClient.ensureQueryData`
    const todosInitialData = _queryClient.getQueryData<TodoListApiResponseSchema>(queryKey);
    // NOTE: somehow returned promise, and app will malfunction if we pass this value to `initialData`
    const todosFetchedData = await _queryClient.fetchQuery({
      queryKey,
      queryFn,
      staleTime,
    });

    return todosInitialData ?? todosFetchedData;
  };

export default routeDataTodos;
