import { createConnectivitySignal } from '@solid-primitives/connectivity';
import { createEventListener } from '@solid-primitives/event-listener';
import {
  Component,
  For,
  Match,
  Switch,
  createEffect,
  createResource,
  onCleanup,
  onMount,
} from 'solid-js';
import { LoadingSpinner } from '../../../shared/components/atoms';
import { useI18n } from '../../../shared/hooks/usei18n/usei18n.hook';
import { todoApi } from '../../../todo/api/todo.api';
import { TodoListApiResponseSchema } from '../../../todo/api/todo.schema';
import TodosFilter from '../../../todo/components/TodosFilter/TodosFilter.component';
import { useTodosParams } from '../../../todo/hooks/useTodos/useTodos.hook';

const Resource: Component = () => {
  const [t] = useI18n();
  const params = useTodosParams();
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

  // #region ATTACH CLICK LISTENER TO BUTTON
  let ref: HTMLButtonElement | undefined;

  const onClickRefetch = () =>
    // refetch will re-run the fetcher without changing the source
    void refetch();

  onMount(() => {
    if (!ref) return;
    ref.addEventListener('click', onClickRefetch);
  });

  onCleanup(() =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ref!.removeEventListener('click', onClickRefetch),
  );
  // #endregion

  return (
    <section class="mx-4 mt-5 rounded-md border-2 border-secondary p-5 md:mx-0">
      <h1 class="mb-2.5 text-xl font-medium text-primary-content sm:text-2xl">Resource</h1>

      <TodosFilter />

      <button
        class="btn-secondary btn-outline btn mb-2.5 text-lg"
        disabled={todosResource.state === 'pending' || todosResource.state === 'refreshing'}
        ref={ref}
      >
        Refetch
      </button>

      <Switch>
        <Match when={todosResource.state === 'pending' || todosResource.state === 'refreshing'}>
          <div class="flex items-center justify-center py-5">
            <LoadingSpinner color="currentColor" />
          </div>
        </Match>

        <Match when={todosResource.state === 'errored'}>
          <div class="alert alert-error mt-2 shadow-lg">
            <div class="flex items-center">
              <pre>{JSON.stringify(todosResource.error, null, 2)}</pre>
            </div>
          </div>
        </Match>

        <Match when={todosResource.state === 'ready'}>
          <For
            each={(todosResource() as TodoListApiResponseSchema).todos}
            fallback={<div class="flex items-center justify-center py-5">{t('empty')}</div>}
          >
            {(todo) => (
              <form
                data-testid="playground-resource-form"
                class="mb-2 flex items-center justify-between"
              >
                <input
                  data-testid="playground-resource-input-checkbox"
                  class="checkbox-accent checkbox"
                  type="checkbox"
                  id={`todo-${todo.id}`}
                  name={`todo-${todo.id}`}
                  checked={todo.completed}
                  onChange={() =>
                    // `mutate` allows to manually overwrite the resource without calling the fetcher
                    mutate((prev) =>
                      prev
                        ? {
                            ...prev,
                            todos: prev.todos.map((_todo) =>
                              _todo.id === todo.id
                                ? { ..._todo, completed: !_todo.completed }
                                : _todo,
                            ),
                          }
                        : prev,
                    )
                  }
                />

                <p
                  data-testid="playground-resource-p"
                  class="ml-5 w-full text-left text-lg text-secondary-content hover:font-bold"
                  classList={{ 'line-through': todo.completed }}
                >
                  {todo.todo}
                </p>
              </form>
            )}
          </For>
        </Match>
      </Switch>
    </section>
  );
};

export default Resource;
