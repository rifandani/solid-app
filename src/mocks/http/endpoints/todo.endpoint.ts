// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { Todo } from '../../../models/Todo.model';
import { getBaseUrl } from '../../util.mock';
import { mockTodo } from '../entities.http';

// mock 10 Todo entity
let todos = Array.from({ length: 10 }, (_, idx) =>
  mockTodo({
    id: idx + 1,
    title: `Todo title ${idx + 1}`,
    completed: idx % 2 === 0,
  }),
);

export const todoHandlers = [
  rest.get(getBaseUrl('todos'), async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({ ok: true, todos })),
  ),
  rest.get(getBaseUrl('todos/:id'), async (req, res, ctx) => {
    const { id } = req.params;
    const paramsTodoId = parseInt(id as string, 10);

    if (paramsTodoId === 500) {
      // throw error
      return res(ctx.status(500));
    }

    const todo = todos.find((_todo) => _todo.id === paramsTodoId);

    if (todo) {
      return res(
        ctx.status(200),
        ctx.json({
          ok: true,
          todo,
        }),
      );
    }

    return res(
      ctx.status(404),
      ctx.json({
        ok: false,
        error: { code: `there is no todo with id: ${id as string}` },
      }),
    );
  }),
  rest.post(getBaseUrl('todos'), async (req, res, ctx) => {
    const { title } = await req.json<Pick<Todo, 'title'>>();
    const todoId = todos.at(-1)?.id;

    if (todoId) {
      const newTodo: Todo = {
        title,
        id: todoId + 1,
        completed: false,
      };

      todos = [...todos, newTodo];

      return res(
        ctx.status(201),
        ctx.json({
          ok: true,
          todo: newTodo,
        }),
      );
    }

    return res(
      ctx.status(500),
      ctx.json({
        ok: false,
        error: { code: `ooppss, unknown error occurred` },
      }),
    );
  }),
  rest.patch(getBaseUrl('todos/:id'), async (req, res, ctx) => {
    const { completed } = await req.json<Pick<Todo, 'completed'>>();
    const { id } = req.params;
    const paramsTodoId = parseInt(id as string, 10);

    const todo = todos.find((_todo) => _todo.id === paramsTodoId);

    if (todo) {
      todos = todos.map((_todo) => (_todo.id === todo.id ? { ..._todo, completed } : _todo));

      return res(
        ctx.status(201),
        ctx.json({
          ok: true,
          todo,
        }),
      );
    }

    return res(
      ctx.status(404),
      ctx.json({
        ok: false,
        error: { code: `there is no todo with id: ${id as string}` },
      }),
    );
  }),
  rest.delete(getBaseUrl('todos/:id'), async (req, res, ctx) => {
    const { id } = req.params;
    const paramsTodoId = parseInt(id as string, 10);

    const todo = todos.find((_todo) => _todo.id === paramsTodoId);

    if (todo) {
      todos = todos.filter((_todo) => _todo.id !== todo.id);

      return res(
        ctx.status(200),
        ctx.json({
          ok: true,
        }),
      );
    }

    return res(
      ctx.status(404),
      ctx.json({
        ok: false,
        error: { code: `there is no todo with id: ${id as string}` },
      }),
    );
  }),
];

export default { todoHandlers };
