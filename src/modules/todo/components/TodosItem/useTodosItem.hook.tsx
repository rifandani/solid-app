import { useAppStorage } from '@shared/hooks/useAppStorage/useAppStorage.hook';
import { useI18n } from '@shared/hooks/usei18n/usei18n.hook';
import { FormOnSubmitEvent } from '@shared/types/form.type';
import { TodoSchema } from '@todo/api/todo.schema';
import useTodoDelete from '@todo/hooks/useTodoDelete/useTodoDelete.hook';
import useTodoUpdate from '@todo/hooks/useTodoUpdate/useTodoUpdate.hook';
import { TodosItemProps } from './TodosItem.component';

export default function useTodosItem(props: TodosItemProps) {
  const [t] = useI18n();
  const [appStorage] = useAppStorage();
  const updateTodoMutation = useTodoUpdate();
  const deleteTodoMutation = useTodoDelete();

  // #region HANDLERS
  const handleUpdateTodo = (todo: TodoSchema) => {
    updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
  };
  const handleDeleteTodo = (evt: FormOnSubmitEvent) => {
    evt.preventDefault();
    // only allow for the correct auth user
    if (props.todo.userId === appStorage.user?.id) deleteTodoMutation.mutate(props.todo.id);
  };
  // #endregion

  return { t, appStorage, handleUpdateTodo, handleDeleteTodo };
}
