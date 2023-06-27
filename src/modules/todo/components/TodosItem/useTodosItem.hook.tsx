import { useAppStorage } from '../../../shared/hooks/useAppStorage/useAppStorage.hook';
import { useI18n } from '../../../shared/hooks/usei18n/usei18n.hook';
import { TodoSchema } from '../../api/todo.schema';
import useTodoDelete from '../../hooks/useTodoDelete/useTodoDelete.hook';
import useTodoUpdate from '../../hooks/useTodoUpdate/useTodoUpdate.hook';

// #region INTERFACES
export type UseTodosItemHook = ReturnType<typeof useTodosItem>;
// #endregion

export default function useTodosItem() {
  const [t] = useI18n();
  const [appStorage] = useAppStorage();
  const updateTodoMutation = useTodoUpdate();
  const deleteTodoMutation = useTodoDelete();

  // #region HANDLERS
  const handleUpdateTodo = (todo: TodoSchema) => {
    updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
  };
  const handleDeleteTodo = (todo: TodoSchema) => {
    deleteTodoMutation.mutate(todo.id);
  };
  // #endregion

  return { t, appStorage, handleUpdateTodo, handleDeleteTodo };
}
