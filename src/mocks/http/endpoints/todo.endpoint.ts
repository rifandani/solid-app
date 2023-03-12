import { random } from '@rifandani/nxact-yutiriti';
// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { Todo, todoFiltersSchema } from '../../../models/Todo.model';
import { getBaseUrl } from '../../util.mock';
import { mockTodo } from '../entities.http';

// mock 10 Todo entity
let todos = Array.from({ length: 10 }, (_, idx) =>
  mockTodo({
    id: idx + 1,
    title: `Todo title ${idx + 1}`,
    completed: idx % 2 === 0,
    createdAt: Date.now() + random(1, 1_000),
  }),
);

export const todoHandlers = [
  rest.get(getBaseUrl('todos'), async (req, res, ctx) => {
    const searchParamsObject = Object.fromEntries(req.url.searchParams);
    const hasSearchParams = !!Object.keys(searchParamsObject).length;

    const parsedSearchParams = todoFiltersSchema.safeParse(searchParamsObject);

    if (!hasSearchParams || !parsedSearchParams.success)
      return res(ctx.status(200), ctx.json({ ok: true, todos }));

    let todoList: Todo[] = todos;

    if (parsedSearchParams.data.filter) {
      todoList =
        parsedSearchParams.data.filter === 'all'
          ? todoList
          : parsedSearchParams.data.filter === 'completed'
          ? todoList.filter((val) => val.completed)
          : todoList.filter((val) => !val.completed);
    }

    if (parsedSearchParams.data.sort) {
      todoList =
        parsedSearchParams.data.sort === 'newest'
          ? [...todoList].sort((a, b) => b.updatedAt - a.updatedAt)
          : [...todoList].sort((a, b) => a.updatedAt - b.updatedAt);
    }

    return res(ctx.status(200), ctx.json({ ok: true, todos: todoList }));
  }),
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
        createdAt: Date.now(),
        updatedAt: Date.now(),
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
      todos = todos.map((_todo) =>
        _todo.id === todo.id ? { ..._todo, completed, updatedAt: Date.now() } : _todo,
      );

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
