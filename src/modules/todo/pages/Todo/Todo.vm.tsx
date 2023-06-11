import { useSearchParams } from '@solidjs/router';
import { batch, createMemo, createResource, createSignal } from 'solid-js';
import { useI18n } from '../../../shared/hooks/usei18n/usei18n.hook';
import { http } from '../../../shared/services/api/http';
import { FormOnSubmitEvent, InputOnKeyUp } from '../../../shared/types/form.type';
import { GetTodosResponse, Todo, TodoFiltersSchema } from '../../api/todo.schema';

// #region INTERFACES
type UseTodoFormParams = {
  refetchTodos: ReturnType<typeof useTodosResource>[1]['refetch'];
};
// #endregion

const useTodosResource = () => {
  const [searchParams] = useSearchParams();
  const paramsObject = createMemo(
    () => JSON.parse(JSON.stringify(searchParams)) as TodoFiltersSchema,
  );

  const todosResource = createResource(paramsObject, (params) =>
    http.get('/todos', { params }).then((res) => res.data as GetTodosResponse),
  );

  return todosResource;
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

const useFormFilter = () => {
  const [params, setParams] = useSearchParams();

  const onChangeFilter = (field: 'sort' | 'filter', value: string) => {
    setParams({ [field]: value });
  };

  return { params, onChangeFilter };
};

const useTodoPageVM = () => {
  const [t] = useI18n();

  const [todos, { refetch: refetchTodos }] = useTodosResource();
  const form = useForm({ refetchTodos });
  const formFilter = useFormFilter();

  return { t, todos, form, formFilter };
};

export default useTodoPageVM;
