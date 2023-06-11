import { z } from 'zod';
import { ApiResponse, ApiSuccessResponse } from '../../shared/constants/types.constant';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

export type TodoSortParams = 'newest' | 'oldest';
export type TodoFilterParams = 'all' | 'completed' | 'incomplete';

export const todoFiltersSchema = z.object({
  sort: z.union([z.literal('newest'), z.literal('oldest')]).optional(),
  filter: z.union([z.literal('all'), z.literal('completed'), z.literal('incomplete')]).optional(),
});

// #region API
export interface PostTodoRequest {
  title: string;
  completed: boolean;
}

export interface PatchTodoRequest {
  title: string;
  completed: boolean;
}
// #endregion

export type GetTodosResponse = ApiResponse<{ todos: Todo[] }>;
export type GetTodosSuccessResponse = ApiSuccessResponse<{ todos: Todo[] }>;
export type TodoFiltersSchema = z.infer<typeof todoFiltersSchema>;
