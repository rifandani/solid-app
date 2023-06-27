import { ResourceParamsSchema } from '../../shared/api/api.schema';
import { http } from '../../shared/services/http/http';
import {
  createTodoApiResponseSchema,
  deleteTodoApiResponseSchema,
  todoDetailApiResponseSchema,
  todoListApiResponseSchema,
  updateTodoApiResponseSchema,
  type CreateTodoSchema,
  type DeleteTodoSchema,
  type TodoSchema,
  type UpdateTodoSchema,
} from './todo.schema';

export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (params: ResourceParamsSchema) => [...todoKeys.lists(), params] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: TodoSchema['id']) => [...todoKeys.details(), id] as const,
};

export const todoApi = {
  list: async (params: ResourceParamsSchema) => {
    const resp = await http.get('todos', { params });

    // `parse` will throw if `resp.data` is not correct
    return todoListApiResponseSchema.parse(resp.data);
  },
  detail: async (id: TodoSchema['id']) => {
    const resp = await http.get(`todos/${id}`);

    // `parse` will throw if `resp.data` is not correct
    return todoDetailApiResponseSchema.parse(resp.data);
  },
  create: async (todo: CreateTodoSchema) => {
    const resp = await http.post(`todos/add`, todo);

    // `parse` will throw if `resp.data` is not correct
    return createTodoApiResponseSchema.parse(resp.data);
  },
  update: async ({ id, ...body }: UpdateTodoSchema) => {
    const resp = await http.put(`todos/${id}`, body);

    // `parse` will throw if `resp.data` is not correct
    return updateTodoApiResponseSchema.parse(resp.data);
  },
  delete: async (id: DeleteTodoSchema['id']) => {
    const resp = await http.delete(`todos/${id}`);

    // `parse` will throw if `resp.data` is not correct
    return deleteTodoApiResponseSchema.parse(resp.data);
  },
} as const;
