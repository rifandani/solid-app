import { Component, For, Match, Show, Switch } from 'solid-js';
import { Button, LoadingSpinner } from '../../components/atoms';
import { TodoItem } from '../../components/molecules';
import { GetTodosSuccessResponse } from '../../models/Todo.model';
import useTodoPageVM from './Todo.vm';

const TodoPage: Component = () => {
  const vm = useTodoPageVM();

  return (
    <main class="py-20 px-10 md:px-24 lg:px-40 xl:px-52 flex flex-col items-center justify-center duration-300">
      <h1 class="text-2xl mb-10 font-semibold tracking-wider text-violet-500">
        {vm.storeAction.translate?.('Todo List')}
      </h1>

      <section class="block w-full border rounded p-5 shadow-md border-slate-300">
        <form
          class="flex flex-col w-full mb-5 duration-300 md:flex-row"
          onSubmit={(ev) => void vm.form.onSubmitTodo(ev)}
        >
          <input
            class="p-2 w-10/12 mr-2 duration-300"
            placeholder="What should you do next..."
            name="todoText"
            id="todoText"
            type="text"
            required
            autofocus
            onKeyUp={vm.form.onKeyUpTodoText}
            value={vm.form.todoText()}
          />

          <Button.Solid class="w-2/12 mt-2 px-0.5 md:mt-0" type="submit">
            Add Todo
          </Button.Solid>
        </form>

        <Show when={!!vm.form.todoTextError()}>
          <div class="block pt-4">
            <h2 class="font-semibold p-2 border rounded border-red-500 text-red-500 bg-red-50">
              {vm.form.todoTextError()}
            </h2>
          </div>
        </Show>

        <Switch>
          <Match when={vm.todos.loading}>
            <div class="flex py-5 justify-center items-center">
              <LoadingSpinner />
            </div>
          </Match>

          <Match when={vm.todos.error as unknown}>
            <div class="flex py-5 justify-center items-center">
              <p>Error todos</p>
            </div>
          </Match>

          <Match when={!vm.todos.error && !vm.todos.loading}>
            <For
              each={(vm.todos() as GetTodosSuccessResponse).todos}
              fallback={<div class="flex py-5 justify-center items-center">No Data</div>}
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
