import { Link } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import { TodoSchema } from '../../api/todo.schema';
import useTodosItem from './useTodosItem.hook';

// #region INTERFACES
type TodosItemProps = {
  todo: TodoSchema;
};
// #endregion

const TodosItem: Component<TodosItemProps> = (props) => {
  const { t, appStorage, handleUpdateTodo, handleDeleteTodo } = useTodosItem();

  return (
    <form
      data-testid="item-form"
      class="mb-2 flex items-center justify-between"
      onSubmit={(e) => {
        e.preventDefault();
        if (props.todo.userId === appStorage.user?.id) handleDeleteTodo(props.todo);
      }}
    >
      <input
        data-testid="item-input-todoId"
        value={props.todo.id}
        type="hidden"
        name="todoId"
        id="todoId"
      />

      <input
        data-testid="item-input-todo"
        class="checkbox-accent checkbox"
        type="checkbox"
        id={`todo-${props.todo.id}`}
        name={`todo-${props.todo.id}`}
        checked={props.todo.completed}
        onChange={() => handleUpdateTodo(props.todo)}
      />

      <Link
        href={props.todo.id.toString()}
        data-testid="item-p-todo"
        class="ml-5 w-full text-left text-lg text-secondary-content hover:font-bold"
        classList={{ 'line-through': props.todo.completed }}
      >
        {props.todo.todo}
      </Link>

      <Show when={props.todo.userId === appStorage.user?.id}>
        <button
          data-testid="item-button-remove"
          class="btn-accent btn-sm btn normal-case"
          type="submit"
        >
          {t('remove', { icon: '💥' })}
        </button>
      </Show>
    </form>
  );
};

export default TodosItem;
