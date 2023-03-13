import { useLocation, useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';
import { useAppStorage } from '../useAppStorage/useAppStorage.hook';

/**
 * Hooks to authenticate your user, wheter they're logged in or not
 */
function useAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [appStorage] = useAppStorage();

  onMount(() => {
    if (!appStorage.user) {
      navigate('/login', { replace: true });
    }

    if (appStorage.user && location.pathname.includes('login')) {
      navigate('/');
    }
  });
}

export default useAuth;
