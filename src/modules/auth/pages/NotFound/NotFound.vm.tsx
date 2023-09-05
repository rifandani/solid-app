import { useAppStorage } from '@shared/hooks/useAppStorage/useAppStorage.hook';
import { useI18n } from '@shared/hooks/usei18n/usei18n.hook';

const useNotFoundPageVM = () => {
  const [app] = useAppStorage();
  const [t] = useI18n();

  return { app, t };
};

export default useNotFoundPageVM;
