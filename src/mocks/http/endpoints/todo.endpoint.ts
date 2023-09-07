import { mockTodo } from '@mocks/http/entities.http';
import { getBaseUrl } from '@mocks/util.mock';
import { ResourceParamsSchema, resourceParamsSchema } from '@shared/api/api.schema';
import {
  CreateTodoSchema,
  DeleteTodoApiResponseSchema,
  TodoSchema,
  UpdateTodoSchema,
} from '@todo/api/todo.schema';
import { RestHandler, rest } from 'msw';

function getTodos(length: number) {
  return Array.from({ length }, (_, idx) =>
    mockTodo({
      id: idx + 1,
      userId: idx + 1,
      todo: `Todo title ${idx + 1}`,
      completed: idx % 2 === 0,
    }),
  );
}

// mock 10 Todo entity
let todos = Array.from({ length: 10 }, (_, idx) =>
  mockTodo({
    id: idx + 1,
    userId: idx + 1,
    todo: `Todo title ${idx + 1}`,
    completed: idx % 2 === 0,
  }),
);

export const todoHandlers: RestHandler[] = [
  rest.get(getBaseUrl('todos'), async (req, res, ctx) => {
    const searchParamsObject = Object.fromEntries(req.url.searchParams) as ResourceParamsSchema;
    const hasSearchParams = !!Object.keys(searchParamsObject).length;

    const parsedSearchParams = resourceParamsSchema.safeParse(searchParamsObject);

    if (!hasSearchParams || !parsedSearchParams.success)
      return res(
        ctx.status(200),
        ctx.json({
          todos: getTodos(10),
          limit: 10,
          skip: 0,
          total: 150,
        }),
      );

    const limit = parsedSearchParams.data?.limit ?? 10;
    const skip = parsedSearchParams.data?.skip ?? 0;

    return res(
      ctx.status(200),
      ctx.json({
        todos: getTodos(limit),
        limit,
        skip,
        total: 150,
      }),
    );
  }),
  rest.post(getBaseUrl('todos/add'), async (req, res, ctx) => {
    const todoPayload = await req.json<CreateTodoSchema>();
    const todoId = todos.at(-1)?.id;

    if (todoId) {
      const newTodo: TodoSchema = todoPayload;

      todos = [newTodo, ...todos];

      return res(ctx.status(200), ctx.json(todoPayload));
    }

    return res(
      ctx.status(400),
      ctx.json({
        message: `ooppss, unknown error occurred`,
      }),
    );
  }),
  rest.put(getBaseUrl('todos/:id'), async (req, res, ctx) => {
    const todoPayload = await req.json<UpdateTodoSchema>();
    const { id } = req.params;
    const todoId = parseInt(id as string, 10);

    const todo = todos.find((_todo) => _todo.id === todoId);

    if (todo) {
      todos = todos.map((_todo) =>
        _todo.id === todo.id ? { ..._todo, completed: todoPayload.completed } : _todo,
      );

      return res(ctx.status(200), ctx.json({ ...todo, completed: todoPayload.completed }));
    }

    return res(
      ctx.status(404),
      ctx.json({
        message: `there is no todo with id: ${todoId}`,
      }),
    );
  }),
  rest.delete(getBaseUrl('todos/:id'), async (req, res, ctx) => {
    const { id } = req.params;
    const todoId = parseInt(id as string, 10);

    const todo = todos.find((_todo) => _todo.id === todoId);

    if (todo) {
      todos = todos.filter((_todo) => _todo.id !== todo.id);

      const deleteResponse: DeleteTodoApiResponseSchema = {
        ...todo,
        isDeleted: true,
        deletedOn: new Date().toISOString(),
      };

      return res(ctx.status(200), ctx.json(deleteResponse));
    }

    return res(
      ctx.status(404),
      ctx.json({
        message: `there is no todo with id: ${todoId}`,
      }),
    );
  }),
];
