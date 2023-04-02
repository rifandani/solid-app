import { Component, For, Match, Show, Switch } from 'solid-js';
import { LoadingSpinner } from '../../components/atoms';
import { TodoItem } from '../../components/molecules';
import { GetTodosSuccessResponse } from '../../models/Todo.model';
import useTodoPageVM from './Todo.vm';

const TodoPage: Component = () => {
  const vm = useTodoPageVM();

  return (
    <main class="flex flex-col items-center justify-center px-10 py-20 duration-300 md:px-24 lg:px-40 xl:px-52">
      <h1 class="text-primary-content mb-10 text-2xl font-semibold tracking-wider">
        {vm.t('xList', { feature: 'Todo' })}
      </h1>

      <section class="card bg-secondary text-secondary-content w-full rounded-lg border p-5 shadow-lg">
        <form
          class="form-control  mb-3 w-full duration-300 lg:flex-row"
          onSubmit={(ev) => void vm.form.onSubmitTodo(ev)}
        >
          <input
            class="input-bordered input-accent input text-accent-content w-full lg:w-10/12"
            placeholder="What should you do next..."
            name="todoText"
            id="todoText"
            type="text"
            required
            autofocus
            onKeyUp={vm.form.onKeyUpTodoText}
            value={vm.form.todoText()}
          />

          <button
            class="btn-accent btn ml-0 mt-2 w-full normal-case lg:ml-2 lg:mt-0 lg:w-2/12"
            type="submit"
          >
            Add ✔
          </button>
        </form>

        <Show when={!!vm.form.todoTextError()}>
          <div class="alert alert-error mt-2 shadow-lg">
            <div class="flex items-center">
              <span>❌</span>
              <span>{vm.form.todoTextError()}</span>
            </div>
          </div>
        </Show>

        <Switch>
          <Match when={vm.todos.loading}>
            <div class="flex items-center justify-center py-5">
              <LoadingSpinner color="currentColor" />
            </div>
          </Match>

          <Match when={!!vm.todos.error}>
            <div class="alert alert-error mt-2 shadow-lg">
              <div class="flex items-center">
                <span>❌ Todos error: </span>
                <pre>{JSON.stringify(vm.todos.error, null, 2)}</pre>
              </div>
            </div>
          </Match>

          <Match when={!vm.todos.error && !vm.todos.loading}>
            <form class="mb-3 flex w-full flex-col duration-300 md:flex-row md:space-x-2">
              <label class="label">
                <span class="label-text">Sort by</span>
              </label>
              <select
                value={vm.formFilter.params.sort || 'newest'}
                onChange={(e) => vm.formFilter.onChangeFilter('sort', e.currentTarget.value)}
                class="select-bordered select select-md"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>

              <label class="label">
                <span class="label-text">Filter by</span>
              </label>
              <select
                value={vm.formFilter.params.filter || 'all'}
                onChange={(e) => vm.formFilter.onChangeFilter('filter', e.currentTarget.value)}
                class="select-bordered select select-md"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </form>

            <For
              each={(vm.todos() as GetTodosSuccessResponse).todos}
              fallback={<div class="flex items-center justify-center py-5">No Data</div>}
            >
              {(todo) => (
                <TodoItem
                  todo={todo}
                  onChangeTodoItemCheckbox={vm.form.onChangeTodoItemCheckbox}
                  onDeleteTodoItem={vm.form.onDeleteTodoItem}
                />
              )}
            </For>
          </Match>
        </Switch>
      </section>
    </main>
  );
};

export default TodoPage;
