import { Link } from '@solidjs/router';
import { TodoSchema } from '@todo/api/todo.schema';
import { Component, Show } from 'solid-js';
import useTodosItem from './useTodosItem.hook';

// #region INTERFACES
export type TodosItemProps = {
  todo: TodoSchema;
};
// #endregion

const TodosItem: Component<TodosItemProps> = (props) => {
  const { t, appStorage, handleUpdateTodo, handleDeleteTodo } = useTodosItem(props);

  return (
    <form
      aria-label="form-todo"
      data-testid={`form-${props.todo.id}`}
      class="mb-2 flex items-center justify-between duration-300 ease-in-out animate-in slide-in-from-left-5"
      onSubmit={handleDeleteTodo}
    >
      <input
        data-testid="input-todoId"
        type="hidden"
        name="todoId"
        id="todoId"
        value={props.todo.id}
      />

      <input
        aria-label="checkbox-todo"
        class="checkbox-primary checkbox"
        type="checkbox"
        id={`todo-${props.todo.id}`}
        name={`todo-${props.todo.id}`}
        checked={props.todo.completed}
        onChange={() => handleUpdateTodo(props.todo)}
      />

      <Link
        aria-label="todo"
        class="ml-5 w-full text-left text-lg hover:font-bold"
        classList={{ 'line-through': props.todo.completed }}
        href={props.todo.id.toString()}
      >
        {props.todo.todo}
      </Link>

      <Show when={props.todo.userId === appStorage.user?.id}>
        <button aria-label="button-submit" class="btn btn-primary btn-sm normal-case" type="submit">
          {t('remove', { icon: '💥' })}
        </button>
      </Show>
    </form>
  );
};

export default TodosItem;
