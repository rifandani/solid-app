export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// #region API
export interface PostTodoRequest {
  userId: number;
  title: string;
  completed: boolean;
}

export interface PatchTodoRequest {
  title: string;
  completed: boolean;
}
// #endregion
