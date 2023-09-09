import { queryClient } from '@app/RootProvider.app';
import { RouteDataFuncArgs } from '@solidjs/router';
import { todoApi, todoKeys } from '@todo/api/todo.api';
import { TodoDetailApiResponseSchema } from '@todo/api/todo.schema';
import { z } from 'zod';

const routeDataTodo =
  (_queryClient: typeof queryClient) =>
  async ({ params }: RouteDataFuncArgs) => {
    // will throw error if `params.id` is not a number
    const id = z.coerce.number().parse(params.id);
    const queryKey = todoKeys.detail(id);
    const queryFn = () => todoApi.detail(id);
    const staleTime = 1_000 * 60 * 1; // 1 min

    // or we can use `_queryClient.ensureQueryData`
    const todoInitialData = _queryClient.getQueryData<TodoDetailApiResponseSchema>(queryKey);
    const todoFetchedData = await _queryClient.fetchQuery({
      queryKey,
      queryFn,
      staleTime,
    });

    return todoInitialData ?? todoFetchedData;
  };

export default routeDataTodo;
