import { ErrorApiResponseSchema } from '@shared/api/api.schema';
import { QueryOptions, createQuery } from '@tanstack/solid-query';
import { todoApi, todoKeys } from '@todo/api/todo.api';
import { TodoDetailApiResponseSchema, TodoSchema } from '@todo/api/todo.schema';
import { Except } from 'type-fest';

/**
 * fetch todo
 *
 * @param {number} id - todo id
 */
const useTodo = (
  id: TodoSchema['id'],
  options?: Except<
    QueryOptions<TodoDetailApiResponseSchema, ErrorApiResponseSchema>,
    'queryKey' | 'queryFn'
  >,
) =>
  createQuery({
    ...options,
    queryKey: () => todoKeys.detail(id),
    queryFn: () => todoApi.detail(id),
  });

export default useTodo;
