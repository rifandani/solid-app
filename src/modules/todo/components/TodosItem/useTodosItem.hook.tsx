import { useAppStorage } from '../../../shared/hooks/useAppStorage/useAppStorage.hook';
import { useI18n } from '../../../shared/hooks/usei18n/usei18n.hook';
import { FormOnSubmitEvent } from '../../../shared/types/form.type';
import { TodoSchema } from '../../api/todo.schema';
import useTodoDelete from '../../hooks/useTodoDelete/useTodoDelete.hook';
import useTodoUpdate from '../../hooks/useTodoUpdate/useTodoUpdate.hook';

export default function useTodosItem() {
  const [t] = useI18n();
  const [appStorage] = useAppStorage();
  const updateTodoMutation = useTodoUpdate();
  const deleteTodoMutation = useTodoDelete();

  // #region HANDLERS
  const handleUpdateTodo = (todo: TodoSchema) => {
    updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
  };
  const handleDeleteTodo = (todo: TodoSchema) => (evt: FormOnSubmitEvent) => {
    evt.preventDefault();
    // only allow for the correct auth user
    if (todo.userId === appStorage.user?.id) deleteTodoMutation.mutate(todo.id);
  };
  // #endregion

  return { t, appStorage, handleUpdateTodo, handleDeleteTodo };
}
