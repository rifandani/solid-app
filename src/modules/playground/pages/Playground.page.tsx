import { Component } from 'solid-js';
import { useI18n } from '../../shared/hooks/usei18n/usei18n.hook';
import Resource from '../components/Resource/Resource.component';

const PlaygroundPage: Component = () => {
  const [t] = useI18n();

  return (
    <main class="container mx-auto flex min-h-screen flex-col items-center py-24 text-primary-content duration-300">
      <h1 class="text-3xl font-medium text-primary-content sm:text-4xl">{t('playgroundTitle')}</h1>

      <Resource />
    </main>
  );
};

export default PlaygroundPage;
