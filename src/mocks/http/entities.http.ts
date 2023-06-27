import type { LoginApiResponseSchema } from '../../modules/auth/api/auth.schema';
import type { TodoSchema } from '../../modules/todo/api/todo.schema';

export function mockLoginResponse(
  initialValue?: Partial<LoginApiResponseSchema>,
): LoginApiResponseSchema {
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
