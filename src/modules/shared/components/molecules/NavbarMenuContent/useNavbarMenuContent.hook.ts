import { useNavigate } from '@solidjs/router';
import { useAppStorage } from '../../../hooks/useAppStorage/useAppStorage.hook';
import { useI18n } from '../../../hooks/usei18n/usei18n.hook';

export default function useNavbarMenuContent() {
  const [t] = useI18n();
  const [appStorage, , { remove }] = useAppStorage();
  const navigate = useNavigate();

  // #region HANDLERS
  const handleClickLogout = () => {
    // remove `user` key in local storage
    remove('user');
    // back to login
    navigate('/login');
  };
  // #endregion

  return { t, appStorage, handleClickLogout };
}
