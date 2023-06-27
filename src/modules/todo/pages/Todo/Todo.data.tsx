import { RouteDataFuncArgs } from '@solidjs/router';
import { z } from 'zod';
import { queryClient } from '../../../../app/Store.app';
import { todoApi, todoKeys } from '../../api/todo.api';
import { TodoDetailApiResponseSchema } from '../../api/todo.schema';

const routeDataTodo =
  (_queryClient: typeof queryClient) =>
  async ({ params }: RouteDataFuncArgs) => {
    // original implementation using `createResource`
    // return createResource(params.id, (todoId) =>
    //   http.get(`todos/${todoId}`).then((res) => res.data as TodoDetailApiResponseSchema),
    // );

    // will throw error if `params.id` is not a number
    const id = z.coerce.number().parse(params.id);
    const queryKey = todoKeys.detail(id);
    const queryFn = () => todoApi.detail(id);

    // or we can use `_queryClient.ensureQueryData`
    const todoInitialData = _queryClient.getQueryData<TodoDetailApiResponseSchema>(queryKey);
    const todoFetchedData = await _queryClient.fetchQuery({
      queryKey,
      queryFn,
      staleTime: 1000 * 60 * 1, // 1 min
    });

    return todoInitialData ?? todoFetchedData;
  };

export default routeDataTodo;
