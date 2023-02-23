import { useLocation, useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';
import { appStore, setAppStore } from '../../app/Store.app';
import { UserStore } from '../../models/User.model';

/**
 * Hooks to authenticate your user, wheter they're logged in or not
 */
function useAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  onMount(() => {
    const user = localStorage.getItem('user');

    if (!user) {
      navigate('/login', { replace: true });
    }

    if (user && !appStore.user) {
      setAppStore('user', JSON.parse(user) as UserStore);
    }

    if (user && appStore.user && location.pathname.includes('login')) {
      navigate('/');
    }
  });
}

export default useAuth;
