import { ApiResponse, ApiSuccessResponse } from '../constants/types.constant';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// #region API
export interface PostTodoRequest {
  title: string;
  completed: boolean;
}

export interface PatchTodoRequest {
  title: string;
  completed: boolean;
}

export type GetTodosResponse = ApiResponse<{ todos: Todo[] }>;
export type GetTodosSuccessResponse = ApiSuccessResponse<{ todos: Todo[] }>;
// #endregion
