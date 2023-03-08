import { Component, createEffect } from 'solid-js';
import { Todo } from '../../models/Todo.model';

// #region INTERFACES
export type TodoItemProps = {
  todo: Todo;
  onChangeTodoItemCheckbox: (_todo: Todo) => Promise<void>;
  onDeleteTodoItem: (_todoId: number) => Promise<void>;
};
// #endregion

const TodoItem: Component<TodoItemProps> = (props) => (
  <div class="mb-2 flex items-center justify-between">
    <input
      class="checkbox-accent checkbox"
      type="checkbox"
      name={`todo-${props.todo.id}`}
      id={`todo-${props.todo.id}`}
      checked={props.todo.completed}
      onChange={() => void props.onChangeTodoItemCheckbox(props.todo)}
    />

    <p
      class="ml-5 w-full text-left text-lg text-secondary-content"
      classList={{ 'line-through': props.todo.completed }}
    >
      {props.todo.title}
    </p>

    <button
      class="btn-accent btn-sm btn normal-case"
      type="button"
      onClick={() => createEffect(() => props.onDeleteTodoItem(props.todo.id))}
    >
      Remove
    </button>
  </div>
);

export default TodoItem;
