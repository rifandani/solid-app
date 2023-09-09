import { Icon } from '@iconify-icon/solid';
import { createConnectivitySignal } from '@solid-primitives/connectivity';
import { createEventListener } from '@solid-primitives/event-listener';
import { createTimer } from '@solid-primitives/timer';
import { todoApi } from '@todo/api/todo.api';
import { TodoListApiResponseSchema, TodoSchema } from '@todo/api/todo.schema';
import TodosFilter from '@todo/components/TodosFilter/TodosFilter.component';
import { useTodosParams } from '@todo/hooks/useTodos/useTodos.hook';
import { Component, For, createEffect, createResource } from 'solid-js';
import { Dynamic } from 'solid-js/web';

// #region DYNAMIC RENDERING
const Pending: Component = () => (
  <div class="flex items-center justify-center py-5">
    <Icon icon="svg-spinners:3-dots-fade" height="5em" />
  </div>
);
const Errored: Component<{ error: unknown }> = (props) => (
  <div class="alert alert-error mt-2 shadow-lg">
    <div class="flex items-center">
      <pre>{JSON.stringify(props.error, null, 2)}</pre>
    </div>
  </div>
);
const Success: Component<{ todos: TodoSchema[]; onChange: (_todo: TodoSchema) => void }> = (
  props,
) => (
  <For each={props.todos} fallback={<div class="flex items-center justify-center py-5">Empty</div>}>
    {(todo) => (
      <form data-testid="playground-resource-form" class="mb-2 flex items-center justify-between">
        <input
          data-testid="playground-resource-input-checkbox"
          class="checkbox-secondary checkbox"
          type="checkbox"
          id={`todo-${todo.id}`}
          name={`todo-${todo.id}`}
          checked={todo.completed}
          onChange={() => props.onChange(todo)}
        />

        <p
          data-testid="playground-resource-p"
          class="ml-5 w-full text-left text-lg hover:font-bold"
          classList={{ 'line-through': todo.completed }}
        >
          {todo.todo}
        </p>
      </form>
    )}
  </For>
);

// bad example, the good one should be typed NOT `any`, because the component should have the same props type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resourceMap: Record<'unresolved' | 'pending' | 'ready' | 'refreshing' | 'errored', any> = {
  unresolved: null,
  pending: Pending,
  ready: Success,
  refreshing: Pending,
  errored: Errored,
};
// #endregion

const Resource: Component = () => {
  const { params } = useTodosParams();
  const isOnline = createConnectivitySignal();
  // refetch when back online
  const source = () => isOnline() && params();

  const [todosResource, { mutate, refetch }] = createResource(
    source,
    async (_source) => {
      const res = await todoApi.list(_source);
      return res;
    },
    // { initialValue: mockTodoListApiResponse() },
  );

  // window focus refetching
  createEventListener(document, 'visibilitychange', () => document.hidden || void refetch());

  // polling -> refetch every 10s
  createTimer(() => void refetch(), 10_000, setInterval);

  // Effects are meant primarily for side effects that read but don't write to the reactive system
  // it's best to avoid setting signals in effects,
  createEffect((prev: number) => {
    if (todosResource.state === 'ready') {
      const newFetchTimes = prev + 1;
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: Resource.component.tsx:23 ~ createEffect', { prev, newFetchTimes });

      return newFetchTimes;
    }

    return prev;
  }, 0);

  const onClickRefetch = () =>
    // refetch will re-run the fetcher without changing the source
    void refetch();

  return (
    <section class="mx-4 mt-5 rounded-md border-2 border-secondary p-5 md:mx-0">
      <h1 class="mb-2.5 text-xl font-medium sm:text-2xl">Resource</h1>

      <TodosFilter />

      <button
        class="btn btn-secondary btn-outline mb-2.5 text-lg"
        disabled={todosResource.state === 'pending' || todosResource.state === 'refreshing'}
        onClick={onClickRefetch}
      >
        Refetch
      </button>

      <Dynamic
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        component={resourceMap[todosResource.state]}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error={todosResource.error}
        todos={(todosResource() as TodoListApiResponseSchema).todos}
        onChange={(todo: TodoSchema) =>
          // `mutate` allows to manually overwrite the resource without calling the fetcher
          mutate((prev) =>
            prev
              ? {
                  ...prev,
                  todos: prev.todos.map((_todo) =>
                    _todo.id === todo.id ? { ..._todo, completed: !_todo.completed } : _todo,
                  ),
                }
              : prev,
          )
        }
      />
    </section>
  );
};

export default Resource;
