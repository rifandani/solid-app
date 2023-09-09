import { toaster } from '@kobalte/core';
import { Toaster } from '@shared/components/molecules';
import { useLocation, useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';
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
export default function useAuth() {
  const [t] = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [appStorage] = useAppStorage();

  onMount(() => {
    if (!appStorage.user && location.pathname.includes('login')) return;

    if (!appStorage.user) {
      navigate('/login', { replace: true });
      toaster.show((props) => (
        <Toaster toastId={props.toastId} type="error" title={t('unauthorized')} />
      ));
      return;
    }

    if (location.pathname.includes('login')) {
      navigate('/');
      toaster.show((props) => (
        <Toaster toastId={props.toastId} type="info" title={t('authorized')} />
      ));
    }
  });
}
