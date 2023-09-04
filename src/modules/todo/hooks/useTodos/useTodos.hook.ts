import { useSearchParams } from '@solidjs/router';
import { QueryOptions, createQuery } from '@tanstack/solid-query';
import { Except, SetRequired } from 'type-fest';
import {
  ErrorApiResponseSchema,
  ResourceParamsSchema,
} from '../../../shared/api/api.schema';
import { todoApi, todoKeys } from '../../api/todo.api';
import { TodoListApiResponseSchema } from '../../api/todo.schema';
import { defaultLimit } from '../../constants/todos.constant';

/**
 * todos search params in object
 */
export const useTodosParams = () => {
  const [searchParams] = useSearchParams();
  const params = () =>
    ({
      ...searchParams,
      limit: Number(searchParams?.limit ?? defaultLimit),
    } as SetRequired<ResourceParamsSchema, 'limit'>);

  return params;
};

/**
 * fetch todos based on search params
 */
const useTodos = (
  options?: Except<
    QueryOptions<TodoListApiResponseSchema, ErrorApiResponseSchema>,
    'queryKey' | 'queryFn'
  >,
) => {
  const params = useTodosParams();
  const queryKey = () => todoKeys.list(params());
  const queryFn = () => todoApi.list(params());

  return createQuery({
    ...options,
    queryKey,
    queryFn,
  });
};

export default useTodos;
