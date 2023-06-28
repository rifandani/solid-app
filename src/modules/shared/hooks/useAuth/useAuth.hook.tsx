import { toaster } from '@kobalte/core';
import { useLocation, useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';
import { Toaster } from '../../components/molecules';
import { useAppStorage } from '../useAppStorage/useAppStorage.hook';
import { useI18n } from '../usei18n/usei18n.hook';

/**
 * Hooks to authenticate your user, wheter they're logged in or not
 *
 * @example
 *
 * ```tsx
 * useAuth()
 * ```
 */
function useAuth() {
  const [t] = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [appStorage] = useAppStorage();

  onMount(() => {
    if (!appStorage.user) {
      navigate('/login', { replace: true });
      toaster.show((props) => (
        <Toaster toastId={props.toastId} type="error" title={t('unauthorized')} />
      ));
      return;
    }

    if (appStorage.user && location.pathname.includes('login')) {
      navigate('/');
      toaster.show((props) => (
        <Toaster toastId={props.toastId} type="info" title={t('authorized')} />
      ));
    }
  });
}

export default useAuth;