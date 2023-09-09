import { Icon } from '@iconify-icon/solid';
import { TodoListApiResponseSchema } from '@todo/api/todo.schema';
import { Component, For, Match, Switch } from 'solid-js';
import TodosItem from '../TodosItem/TodosItem.component';
import useTodosList from './useTodosList.hook';

const TodosList: Component = () => {
  const { t, todosQuery } = useTodosList();

  return (
    <Switch>
      <Match when={todosQuery.isLoading}>
        <div data-testid="list-loading" class="flex items-center justify-center py-5">
          <Icon icon="svg-spinners:3-dots-fade" height="5em" />
        </div>
      </Match>

      <Match when={todosQuery.isError}>
        <div data-testid="list-error" class="alert alert-error mt-2 shadow-lg">
          <div class="flex items-center">
            <span>{t('error', { module: 'Todos' })}:</span>
            <pre>{JSON.stringify(todosQuery.error, null, 2)}</pre>
          </div>
        </div>
      </Match>

      <Match when={todosQuery.isSuccess}>
        <For
          each={(todosQuery.data as TodoListApiResponseSchema).todos}
          fallback={
            <div data-testid="list-empty" class="flex items-center justify-center py-5">
              {t('empty')}
            </div>
          }
        >
          {(todo) => <TodosItem todo={todo} />}
        </For>
      </Match>
    </Switch>
  );
};

export default TodosList;
