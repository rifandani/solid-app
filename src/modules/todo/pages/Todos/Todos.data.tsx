import { RouteDataFuncArgs } from '@solidjs/router';
import { SetRequired } from 'type-fest';
import { queryClient } from '../../../../app/Store.app';
import { ResourceParamsSchema } from '../../../shared/api/api.schema';
import { todoApi, todoKeys } from '../../api/todo.api';
import { TodoListApiResponseSchema } from '../../api/todo.schema';
import { defaultLimit } from '../../constants/todos.constant';

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
    const todosInitialData =
      _queryClient.getQueryData<TodoListApiResponseSchema>(queryKey);
    const todosFetchedData = await _queryClient.fetchQuery({
      queryKey,
      queryFn,
      staleTime,
    });

    return todosInitialData ?? todosFetchedData;
  };

export default routeDataTodos;
