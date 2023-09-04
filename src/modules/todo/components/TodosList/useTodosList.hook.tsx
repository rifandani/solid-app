import { useRouteData } from '@solidjs/router';
import { useI18n } from '../../../shared/hooks/usei18n/usei18n.hook';
import { TodoListApiResponseSchema } from '../../api/todo.schema';
import useTodos from '../../hooks/useTodos/useTodos.hook';

export default function useTodosList() {
  const initialData = useRouteData<TodoListApiResponseSchema>();
  const [t] = useI18n();
  const todosQuery = useTodos({ initialData: () => initialData });

  return { t, todosQuery };
}
