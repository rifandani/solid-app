import { Component } from 'solid-js';
import { Todo } from '../../models/Todo.model';
import { Button } from '../atoms';

// #region INTERFACES
export type TodoItemProps = {
  todo: Todo;
  onChangeTodoItemCheckbox: (_todo: Todo) => void;
  onDeleteTodoItem: (_todoId: number) => void;
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
        onChange={() => props.onChangeTodoItemCheckbox(props.todo)}
      />

      <p
        class="text-lg text-left w-full ml-5"
        classList={{ 'line-through': props.todo.completed }}
      >
        {props.todo.title}
      </p>

      <Button.Outlined
        size="sm"
        onClick={() => props.onDeleteTodoItem(props.todo.id)}
      >
        Remove
      </Button.Outlined>
    </div>
  );
};

export default TodoItem;
