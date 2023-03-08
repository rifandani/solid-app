import { batch, createResource, createSignal } from 'solid-js';
import { useAppContext } from '../../app/Store.app';
import { GetTodosResponse, Todo } from '../../models/Todo.model';
import { http } from '../../services/api/http';
import { FormOnSubmitEvent, InputOnKeyUp } from '../../types';

// #region INTERFACES
type UseTodoFormParams = {
  refetchTodos: ReturnType<typeof useTodosResource>[1]['refetch'];
};
// #endregion

const useTodosResource = () => {
  const todoListResource = createResource(() =>
    http.get('/todos').then((res) => res.data as GetTodosResponse),
  );

  return todoListResource;
};

const useForm = ({ refetchTodos }: UseTodoFormParams) => {
  const [todoText, setTodoText] = createSignal('');
  const [todoTextError, setTodoTextError] = createSignal('');

  const onKeyUpTodoText: InputOnKeyUp = (ev) => {
    setTodoText(ev.currentTarget.value);
  };

  const onChangeTodoItemCheckbox = async (todo: Todo) => {
    // update todo
    const resp = await http.patch<Todo>(`/todos/${todo.id}`, {
      completed: !todo.completed,
    });

    // on failed
    if (resp.status !== 201) {
      setTodoTextError('Error editing todo!');
      return;
    }

    // on success
    setTodoTextError('');
    await refetchTodos();
  };

  const onDeleteTodoItem = async (todoId: number) => {
    // delete todo
    const resp = await http.delete<Todo>(`/todos/${todoId}`);

    // on failed
    if (resp.status !== 200) {
      setTodoTextError('Error deleting todo!');
      return;
    }

    // on success
    setTodoTextError('');
    await refetchTodos();
  };

  const onSubmitTodo = async (ev: FormOnSubmitEvent) => {
    ev.preventDefault();

    // add todo
    const resp = await http.post<Todo>('/todos', {
      title: todoText(),
    });

    // on failed
    if (resp.status !== 201) {
      batch(() => {
        setTodoText('');
        setTodoTextError('Error adding new todo!');
      });
      return;
    }

    // on success
    batch(() => {
      setTodoText('');
      setTodoTextError('');
    });
    await refetchTodos();
  };

  return {
    todoText,
    todoTextError,
    onKeyUpTodoText,
    onChangeTodoItemCheckbox,
    onDeleteTodoItem,
    onSubmitTodo,
  };
};

const useTodoPageVM = () => {
  const [, storeAction] = useAppContext();
  const [todos, { refetch: refetchTodos }] = useTodosResource();
  const form = useForm({ refetchTodos });

  return { storeAction, todos, form };
};

export default useTodoPageVM;
