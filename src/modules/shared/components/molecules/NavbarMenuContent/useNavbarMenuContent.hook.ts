import { useNavigate } from '@solidjs/router';
import { modes } from '../../../constants/global.constant';
import { createColorMode } from '../../../hooks/createColorMode/createColorMode.hook';
import { useAppStorage } from '../../../hooks/useAppStorage/useAppStorage.hook';
import { useI18n } from '../../../hooks/usei18n/usei18n.hook';

export default function useNavbarMenuContent() {
  const [t] = useI18n();
  const [appStorage, , { remove }] = useAppStorage();
  const [, setTheme] = createColorMode({
    modes,
    attribute: 'data-theme',
  });
  const navigate = useNavigate();

  // #region HANDLERS
  const handleClickLogout = () => {
    // remove `user` key in local storage
    remove('user');
    // back to login
    navigate('/login');
  };
  // #endregion

  return { t, appStorage, setTheme, handleClickLogout };
}
