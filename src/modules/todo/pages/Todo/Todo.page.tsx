import { Icon } from '@iconify-icon/solid';
import { Link } from '@solidjs/router';
import { Component, Match, Show, Switch } from 'solid-js';
import useTodoPageVM from './Todo.vm';

const TodoPage: Component = () => {
  const { t, appStorage, todoQuery, todoUpdateMutation, form } = useTodoPageVM();

  return (
    <section class="flex flex-col justify-center px-10 py-20 md:px-24 lg:px-40 xl:px-52">
      <div class="mb-10 flex w-full flex-col space-y-2">
        <Link
          role="link"
          aria-label="go-back"
          href="/todos"
          class="link w-fit normal-case hover:skew-x-12"
        >
          ⬅ {t('goBackTo', { target: 'Todos' })}
        </Link>

        <h1 class="text-2xl font-semibold tracking-wider">{t('xDetail', { feature: 'Todo' })}</h1>
      </div>

      <Show when={todoUpdateMutation.isError}>
        <div data-testid="todo-mutationError" class="alert alert-error mt-2 shadow-lg">
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
          <div data-testid="todo-loading" class="flex items-center justify-center py-5">
            <Icon icon="svg-spinners:3-dots-fade" height="5em" />
          </div>
        </Match>

        <Match when={todoQuery.isError}>
          <div data-testid="todo-error" class="alert alert-error mt-2 shadow-lg">
            <div class="flex items-center">
              <span>{t('error', { module: 'Todos' })}:</span>
              <pre>{JSON.stringify(todoQuery.error, null, 2)}</pre>
            </div>
          </div>
        </Match>

        <Match when={todoQuery.isSuccess && todoQuery.data}>
          <form use:form aria-label="form-todo" class="join">
            <input
              aria-label="textbox-todo"
              class="input join-item input-bordered input-primary w-full"
              name="todo"
              id="todo"
              type="text"
              required
              value={todoQuery.data?.todo ?? t('loading')}
            />

            <Show when={appStorage.user?.id === todoQuery.data?.userId}>
              <button
                aria-label="button-submit"
                class="btn btn-primary join-item normal-case"
                type="submit"
                disabled={todoUpdateMutation.isLoading}
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
