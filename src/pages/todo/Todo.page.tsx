import { Component, For, Match, Show, Switch } from 'solid-js';
import { Button, LoadingSpinner } from '../../components/atoms';
import { TodoItem } from '../../components/molecules';
import { GetTodosSuccessResponse } from '../../models/Todo.model';
import useTodoPageVM from './Todo.vm';

const TodoPage: Component = () => {
  const vm = useTodoPageVM();

  return (
    <main class="flex flex-col items-center justify-center py-20 px-10 duration-300 md:px-24 lg:px-40 xl:px-52">
      <h1 class="mb-10 text-2xl font-semibold tracking-wider text-violet-500">
        {vm.storeAction.translate?.('Todo List')}
      </h1>

      <section class="block w-full rounded border border-slate-300 p-5 shadow-md">
        <form
          class="mb-5 flex w-full flex-col duration-300 md:flex-row"
          onSubmit={(ev) => void vm.form.onSubmitTodo(ev)}
        >
          <input
            class="mr-2 w-10/12 p-2 duration-300"
            placeholder="What should you do next..."
            name="todoText"
            id="todoText"
            type="text"
            required
            autofocus
            onKeyUp={vm.form.onKeyUpTodoText}
            value={vm.form.todoText()}
          />

          <Button.Solid class="mt-2 w-2/12 px-0.5 md:mt-0" type="submit">
            Add Todo
          </Button.Solid>
        </form>

        <Show when={!!vm.form.todoTextError()}>
          <div class="block pt-4">
            <h2 class="rounded border border-red-500 bg-red-50 p-2 font-semibold text-red-500">
              {vm.form.todoTextError()}
            </h2>
          </div>
        </Show>

        <Switch>
          <Match when={vm.todos.loading}>
            <div class="flex items-center justify-center py-5">
              <LoadingSpinner />
            </div>
          </Match>

          <Match when={vm.todos.error as unknown}>
            <div class="flex items-center justify-center py-5">
              <p>Error todos</p>
            </div>
          </Match>

          <Match when={!vm.todos.error && !vm.todos.loading}>
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
