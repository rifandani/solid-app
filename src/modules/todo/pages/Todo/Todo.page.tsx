import { Icon } from '@iconify-icon/solid';
import { Link } from '@solidjs/router';
import { Component, Match, Show, Switch } from 'solid-js';
import useTodoPageVM from './Todo.vm';

const TodoPage: Component = () => {
  const { t, appStorage, todoQuery, todoUpdateMutation, form } = useTodoPageVM();

  return (
    <section class="flex flex-col justify-center px-10 py-20 md:px-24 lg:px-40 xl:px-52">
      <div class="mb-10 flex w-full flex-col space-y-2">
        <Link href="/todos" class="btn-link w-fit normal-case text-primary-content ">
          ⬅ {t('goBackTo', { target: 'Todos' })}
        </Link>

        <h1 class="text-2xl font-semibold tracking-wider text-primary-content">
          {t('xDetail', { feature: 'Todo' })}
        </h1>
      </div>

      <Show when={todoUpdateMutation.isError}>
        <div class="alert alert-error mt-2 shadow-lg">
          <div class="flex items-center">
            <span>
              {t('error', { module: 'Todo Mutation' })}:{' '}
              {(todoUpdateMutation.error as Error).message}
            </span>
          </div>
        </div>
      </Show>

      <Switch>
        <Match when={todoQuery.isLoading}>
          <div class="flex items-center justify-center py-5">
            <Icon icon="svg-spinners:3-dots-fade" height="5em" class="text-secondary-content" />
          </div>
        </Match>

        <Match when={todoQuery.isError}>
          <div class="alert alert-error mt-2 shadow-lg">
            <div class="flex items-center">
              <span>{t('error', { module: 'Todos' })}:</span>
              <pre>{JSON.stringify(todoQuery.error, null, 2)}</pre>
            </div>
          </div>
        </Match>

        <Match when={todoQuery.isSuccess && todoQuery.data}>
          <form use:form data-testid="form" class="join">
            <input
              data-testid="input-todo"
              class="input join-item input-bordered input-accent w-full text-accent-content"
              name="todo"
              id="todo"
              type="text"
              required
              value={todoQuery.data.todo ?? t('loading')}
            />

            <Show when={appStorage.user?.id === todoQuery.data.userId}>
              <button
                data-testid="button-submit"
                class="btn btn-accent join-item normal-case"
                type="submit"
              >
                {t('update', { icon: '🖋' })}
              </button>
            </Show>
          </form>
        </Match>
      </Switch>
    </section>
  );
};

export default TodoPage;
