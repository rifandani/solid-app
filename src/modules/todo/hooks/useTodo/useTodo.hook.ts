import { createQuery } from '@tanstack/solid-query';
import { todoApi, todoKeys } from '../../api/todo.api';
import { TodoSchema } from '../../api/todo.schema';

const useTodo = (id: TodoSchema['id']) =>
  createQuery({ queryKey: () => todoKeys.detail(id), queryFn: () => todoApi.detail(id) });

export default useTodo;
