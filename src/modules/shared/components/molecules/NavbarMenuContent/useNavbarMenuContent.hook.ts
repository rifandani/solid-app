import { modes } from '@shared/constants/global.constant';
import { createColorMode } from '@shared/hooks/createColorMode/createColorMode.hook';
import { useAppStorage } from '@shared/hooks/useAppStorage/useAppStorage.hook';
import { useI18n } from '@shared/hooks/usei18n/usei18n.hook';
import { useNavigate } from '@solidjs/router';

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
