import { useI18n } from '@shared/hooks/usei18n/usei18n.hook';
import useTodos from '@todo/hooks/useTodos/useTodos.hook';

export default function useTodosList() {
  const [t] = useI18n();
  const todosQuery = useTodos();

  return { t, todosQuery };
}
