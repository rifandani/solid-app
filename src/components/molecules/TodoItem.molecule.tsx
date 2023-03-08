import { Component, createEffect } from 'solid-js';
import { Todo } from '../../models/Todo.model';
import { Button } from '../atoms';

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
      type="checkbox"
      name={`todo-${props.todo.id}`}
      id={`todo-${props.todo.id}`}
      checked={props.todo.completed}
      onChange={() => void props.onChangeTodoItemCheckbox(props.todo)}
    />

    <p class="ml-5 w-full text-left text-lg" classList={{ 'line-through': props.todo.completed }}>
      {props.todo.title}
    </p>

    <Button.Outlined
      size="sm"
      onClick={() => createEffect(() => props.onDeleteTodoItem(props.todo.id))}
    >
      Remove
    </Button.Outlined>
  </div>
);

export default TodoItem;
