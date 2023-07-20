import useAuth from '../../../hooks/useAuth/useAuth.hook';
import { useI18n } from '../../../hooks/usei18n/usei18n.hook';

export default function useNavbar() {
  const [t] = useI18n();

  useAuth();

  return { t };
}
