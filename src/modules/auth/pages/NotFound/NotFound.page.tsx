import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import { useAppStorage } from '../../../shared/hooks/useAppStorage/useAppStorage.hook';

const NotFoundPage: Component = () => {
  const [app] = useAppStorage();

  return (
    <main class="flex h-screen flex-col items-center justify-center space-y-3 text-primary-content">
      <h1 class="text-3xl font-bold italic">404: Not Found</h1>
      <p class="mb-5">It's gone</p>

      <Link class="link-neutral link hover:skew-x-12" href="/">
        {app.user ? 'Go back to home' : 'Go back to login'}
      </Link>
    </main>
  );
};

export default NotFoundPage;
