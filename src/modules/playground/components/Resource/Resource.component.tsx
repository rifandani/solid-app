import { Component, For, Match, Switch, createResource } from 'solid-js';
import { LoadingSpinner } from '../../../shared/components/atoms';
import { useI18n } from '../../../shared/hooks/usei18n/usei18n.hook';
import { todoApi } from '../../../todo/api/todo.api';
import { TodoListApiResponseSchema } from '../../../todo/api/todo.schema';
import TodosFilter from '../../../todo/components/TodosFilter/TodosFilter.component';
import TodosItem from '../../../todo/components/TodosItem/TodosItem.component';
import { useTodosParams } from '../../../todo/hooks/useTodos/useTodos.hook';

const Resource: Component = () => {
  const [t] = useI18n();
  const params = useTodosParams();
  const [todosResource] = createResource(
    params,
    async (source) => {
      const res = await todoApi.list(source);
      return res;
    },
    // { initialValue: mockTodoListApiResponse() },
  );

  return (
    <section class="mt-5 rounded-md border-2 border-secondary p-5">
      <h1 class="mb-2.5 text-xl font-medium text-primary-content sm:text-2xl">Resource</h1>

      <TodosFilter />

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
            {(todo) => <TodosItem todo={todo} />}
          </For>
        </Match>
      </Switch>
    </section>
  );
};

export default Resource;
