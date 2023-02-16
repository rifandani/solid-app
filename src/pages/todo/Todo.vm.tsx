import { batch, createResource, createSignal } from 'solid-js';
import { appStore } from '../../app/AppStore';
import { Todo } from '../../models/Todo.model';
import { User } from '../../models/User.model';
import { axiosInstance } from '../../services/http';
import { FormOnSubmitEvent, InputOnKeyUp } from '../../types';

type UseTodoFormParams = {
  refetchTodos: ReturnType<typeof useTodoList>[1]['refetch'];
};

const useTodoList = () => {
  const todoListResource = createResource<Todo[], User>(
    appStore.user,
    (_user) =>
      axiosInstance
        .get('/todos', { params: { userId: _user.id } })
        .then((res) => res.data),
    { initialValue: [] },
  );

  return todoListResource;
};

const useTodoForm = ({ refetchTodos }: UseTodoFormParams) => {
  const [todoText, setTodoText] = createSignal('');
  const [todoTextError, setTodoTextError] = createSignal('');

  const onKeyUpTodoText: InputOnKeyUp = (ev) => {
    setTodoText(ev.currentTarget.value);
  };

  const onChangeTodoItemCheckbox = async (todo: Todo) => {
    // PATCH todo
    const resp = await axiosInstance.patch<Todo>(`/todos/${todo.id}`, {
      completed: !todo.completed,
    });

    // on failed
    if (resp.status !== 200) {
      setTodoTextError('Error editing todo!');
      return;
    }

    // on success
    setTodoTextError('');
    refetchTodos();
  };

  const onDeleteTodoItem = async (todoId: number) => {
    // PATCH todo
    const resp = await axiosInstance.delete<Todo>(`/todos/${todoId}`);

    // on failed
    if (resp.status !== 200) {
      setTodoTextError('Error deleting todo!');
      return;
    }

    // on success
    setTodoTextError('');
    refetchTodos();
  };

  const onSubmitTodo = async (ev: FormOnSubmitEvent) => {
    ev.preventDefault();

    // POST todo
    const resp = await axiosInstance.post<Todo>('/todos', {
      userId: appStore.user?.id,
      title: todoText(),
      completed: false,
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
    refetchTodos();
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

export const useTodoPageVM = () => {
  const [todos, { refetch: refetchTodos }] = useTodoList();
  const todoForm = useTodoForm({ refetchTodos });

  return { todos, todoForm };
};
