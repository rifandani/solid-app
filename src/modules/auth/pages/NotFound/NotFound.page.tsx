import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import useNotFoundPageVM from './NotFound.vm';

const NotFoundPage: Component = () => {
  const vm = useNotFoundPageVM();

  return (
    <main class="flex h-screen flex-col items-center justify-center space-y-3">
      <h1 class="text-3xl font-bold italic">{vm.t('notFound404')}</h1>
      <p class="mb-5">{vm.t('gone')}</p>

      <Link href={vm.app.user ? '/' : '/login'} class="link hover:skew-x-12">
        {vm.t('goBackTo', { target: vm.app.user ? 'home' : 'login' })}
      </Link>
    </main>
  );
};

export default NotFoundPage;
