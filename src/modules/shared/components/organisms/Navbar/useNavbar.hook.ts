import useAuth from '@shared/hooks/useAuth/useAuth.hook';
import { useI18n } from '@shared/hooks/usei18n/usei18n.hook';

export default function useNavbar() {
  useAuth();
  const [t] = useI18n();

  return { t };
}
