import { Component, For, Match, Switch } from 'solid-js';
import { LoadingSpinner } from '../../../shared/components/atoms';
import { TodoListApiResponseSchema } from '../../api/todo.schema';
import TodosItem from '../../components/TodosItem/TodosItem.component';
import useTodosList from './useTodosList.hook';

const TodosList: Component = () => {
  const { t, todosQuery } = useTodosList();

  return (
    <Switch>
      <Match when={todosQuery.isLoading}>
        <div class="flex items-center justify-center py-5">
          <LoadingSpinner color="currentColor" />
        </div>
      </Match>

      <Match when={todosQuery.isError}>
        <div class="alert alert-error mt-2 shadow-lg">
          <div class="flex items-center">
            <span>{t('error', { module: 'Todos' })}:</span>
            <pre>{JSON.stringify(todosQuery.error, null, 2)}</pre>
          </div>
        </div>
      </Match>

      <Match when={todosQuery.isSuccess}>
        <For
          each={(todosQuery.data as TodoListApiResponseSchema).todos}
          fallback={<div class="flex items-center justify-center py-5">{t('empty')}</div>}
        >
          {(todo) => <TodosItem todo={todo} />}
        </For>
      </Match>
    </Switch>
  );
};

export default TodosList;
