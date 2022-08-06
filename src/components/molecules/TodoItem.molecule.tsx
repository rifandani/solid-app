import { Component } from 'solid-js';
import { Todo } from '../../models/Todo.model';
import {
  onChangeTodoItemCheckbox,
  onDeleteTodoItem,
} from '../../pages/todo/Todo.vm';
import { Button } from '../atoms';

// #region INTERFACES
export type TodoItemProps = {
  todo: Todo;
};
// #endregion

const TodoItem: Component<TodoItemProps> = (props) => {
  return (
    <div class="flex items-center justify-between mb-2">
      <input
        type="checkbox"
        name={`todo-${props.todo.id}`}
        id={`todo-${props.todo.id}`}
        checked={props.todo.completed}
        onChange={() => onChangeTodoItemCheckbox(props.todo)}
      />

      <p
        class="text-lg text-left w-full ml-5"
        classList={{ 'line-through': props.todo.completed }}
      >
        {props.todo.title}
      </p>

      <Button.Outlined
        size="sm"
        onClick={() => onDeleteTodoItem(props.todo.id)}
      >
        Remove
      </Button.Outlined>
    </div>
  );
};

export default TodoItem;
