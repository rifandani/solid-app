import { z } from 'zod';
import { resourceListSchema } from '../../shared/api/api.schema';

// #region ENTITY SCHEMA
export const todoSchema = z.object({
  id: z.number().positive(),
  todo: z.string(),
  completed: z.boolean(),
  userId: z.number().positive(),
});
export const createTodoSchema = todoSchema;
export const updateTodoSchema = todoSchema.omit({ userId: true });
export const deleteTodoSchema = todoSchema.pick({ id: true });
// #endregion

// #region API SCHEMA
export const todoListApiResponseSchema = resourceListSchema.extend({
  todos: z.array(todoSchema),
});
export const todoDetailApiResponseSchema = todoSchema;
export const createTodoApiResponseSchema = todoSchema;
export const updateTodoApiResponseSchema = todoSchema;
export const deleteTodoApiResponseSchema = todoSchema.extend({
  isDeleted: z.literal(true),
  deletedOn: z.string().datetime(),
});
// #endregion

// #region SCHEMA TYPES
export type TodoSchema = z.infer<typeof todoSchema>;
export type CreateTodoSchema = z.infer<typeof createTodoSchema>;
export type UpdateTodoSchema = z.infer<typeof updateTodoSchema>;
export type DeleteTodoSchema = z.infer<typeof deleteTodoSchema>;
export type TodoListApiResponseSchema = z.infer<typeof todoListApiResponseSchema>;
export type TodoDetailApiResponseSchema = z.infer<typeof todoDetailApiResponseSchema>;
export type CreateTodoApiResponseSchema = z.infer<typeof createTodoApiResponseSchema>;
export type UpdateTodoApiResponseSchema = z.infer<typeof updateTodoApiResponseSchema>;
export type DeleteTodoApiResponseSchema = z.infer<typeof deleteTodoApiResponseSchema>;
// #endregion
