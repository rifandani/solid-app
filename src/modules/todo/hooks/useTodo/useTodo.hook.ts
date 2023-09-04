import { QueryOptions, createQuery } from '@tanstack/solid-query';
import { Except } from 'type-fest';
import { ErrorApiResponseSchema } from '../../../shared/api/api.schema';
import { todoApi, todoKeys } from '../../api/todo.api';
import { TodoDetailApiResponseSchema, TodoSchema } from '../../api/todo.schema';

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
