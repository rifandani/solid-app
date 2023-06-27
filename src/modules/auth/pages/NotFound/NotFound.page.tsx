import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import useNotFoundPageVM from './NotFound.vm';

const NotFoundPage: Component = () => {
  const vm = useNotFoundPageVM();

  return (
    <main class="flex h-screen flex-col items-center justify-center space-y-3 text-primary-content">
      <h1 class="text-3xl font-bold italic">{vm.t('notFound404')}</h1>
      <p class="mb-5">{vm.t('gone')}</p>

      <Link class="link-neutral link hover:skew-x-12" href="/">
        {vm.app.user ? vm.t('goBackTo', { target: 'home' }) : vm.t('goBackTo', { target: 'login' })}
      </Link>
    </main>
  );
};

export default NotFoundPage;
