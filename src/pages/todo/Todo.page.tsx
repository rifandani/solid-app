import { Component, For, Show } from 'solid-js';
import { Button, LoadingSpinner } from '../../components/atoms';
import { TodoItem } from '../../components/molecules';
import {
  onKeyUpTodoText,
  onSubmitTodo,
  todos,
  todoText,
  todoTextError,
} from './Todo.vm';

const TodoPage: Component = () => {
  return (
    <main class="py-20 px-10 md:px-24 lg:px-40 xl:px-52 flex flex-col items-center justify-center duration-300">
      <h1 class="text-2xl mb-10 font-semibold tracking-wider text-violet-500">
        Todo List
      </h1>

      <section class="block w-full border rounded p-5 shadow-md border-slate-300">
        <form
          class="flex flex-col w-full mb-5 duration-300 md:flex-row"
          onSubmit={onSubmitTodo}
        >
          <input
            class="p-2 w-10/12 mr-2 duration-300"
            placeholder="What should you do next..."
            name="todoText"
            id="todoText"
            type="text"
            required
            autofocus
            onKeyUp={onKeyUpTodoText}
            value={todoText()}
          />

          <Button.Solid class="w-2/12 mt-2 px-0.5 md:mt-0" type="submit">
            Add Todo
          </Button.Solid>
        </form>

        <Show when={!!todoTextError()}>
          <div class="block pt-4">
            <h2 class="font-semibold p-2 border rounded border-red-500 text-red-500 bg-red-50">
              {todoTextError()}
            </h2>
          </div>
        </Show>

        {/* loop thru todos */}
        <Show when={todos.loading}>
          <div class="flex py-5 justify-center items-center">
            <LoadingSpinner />
          </div>
        </Show>

        <For
          each={todos()}
          fallback={
            <div class="flex py-5 justify-center items-center">No Data</div>
          }
        >
          {(todo) => <TodoItem todo={todo} />}
        </For>
      </section>
    </main>
  );
};

export default TodoPage;
