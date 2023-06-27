import { useI18n } from '../../../shared/hooks/usei18n/usei18n.hook';
import useTodos from '../../hooks/useTodos/useTodos.hook';

const useTodosPageVM = () => {
  const [t] = useI18n();
  const todosQuery = useTodos();

  return { t, todosQuery };
};

export default useTodosPageVM;
