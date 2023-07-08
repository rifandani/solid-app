import { useSearchParams } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { SetRequired } from 'type-fest';
import { ResourceParamsSchema } from '../../../shared/api/api.schema';
import { todoApi, todoKeys } from '../../api/todo.api';
import { defaultLimit } from '../../constants/todos.constant';

export const useTodosParams = () => {
  const [searchParams] = useSearchParams();
  const params = () =>
    ({
      ...searchParams,
      limit: Number(searchParams?.limit ?? defaultLimit),
    }) as SetRequired<ResourceParamsSchema, 'limit'>;

  return params;
};

const useTodos = () => {
  const params = useTodosParams();
  const queryKey = () => todoKeys.list(params());
  const queryFn = () => todoApi.list(params());

  return createQuery({
    queryKey,
    queryFn,
    staleTime: 5_000,
  });
};

export default useTodos;
