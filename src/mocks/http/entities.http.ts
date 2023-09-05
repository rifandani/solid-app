import type { LoginApiResponseSchema } from '@auth/api/auth.schema';
import type { TodoListApiResponseSchema, TodoSchema } from '@todo/api/todo.schema';

export function mockLogin(initialValue?: Partial<LoginApiResponseSchema>): LoginApiResponseSchema {
  return {
    id: 15,
    username: 'kminchelle',
    email: 'kminchelle@qq.com',
    firstName: 'Jeanne',
    lastName: 'Halvorson',
    gender: 'female',
    image: 'https://robohash.org/autquiaut.png',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZyIsImlhdCI6MTY4NTU5NzcxNiwiZXhwIjoxNjg1NjAxMzE2fQ.nmKDmEtDztT2ufadJrDiJfolMtiP-fS_ZNk1XJVPSJE',
    ...(initialValue && initialValue),
  };
}

export function mockTodo(initialValue?: Partial<TodoSchema>): TodoSchema {
  return {
    id: 1,
    userId: 1,
    todo: 'Mocked Todo 1',
    completed: false,
    ...(initialValue && initialValue),
  };
}

export function mockTodoListApiResponse(
  initialValue?: Partial<TodoListApiResponseSchema>,
): TodoListApiResponseSchema {
  return {
    limit: 10,
    skip: 0,
    total: 100,
    todos: Array.from({ length: 10 }).map((_, id) => mockTodo({ id, userId: id })),
    ...(initialValue && initialValue),
  };
}
