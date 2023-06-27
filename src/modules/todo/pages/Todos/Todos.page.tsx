import { Component, For, Match, Switch } from 'solid-js';
import { LoadingSpinner } from '../../../shared/components/atoms';
import { TodoListApiResponseSchema } from '../../api/todo.schema';
import TodosCreate from '../../components/TodosCreate/TodosCreate.component';
import TodosFilter from '../../components/TodosFilter/TodosFilter.component';
import TodosItem from '../../components/TodosItem/TodosItem.component';
import useTodosPageVM from './Todos.vm';

const TodosPage: Component = () => {
  const { t, todosQuery } = useTodosPageVM();

  return (
    <main class="flex flex-col items-center justify-center px-10 py-20 duration-300 md:px-24 lg:px-40 xl:px-52">
      <h1
        data-testid="title"
        class="mb-10 text-2xl font-semibold tracking-wider text-primary-content"
      >
        {t('xList', { feature: 'Todo' })}
      </h1>

      <section class="card w-full rounded-lg border bg-secondary p-5 text-secondary-content shadow-lg">
        <TodosCreate />

        <TodosFilter />

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
      </section>
    </main>
  );
};

export default TodosPage;
