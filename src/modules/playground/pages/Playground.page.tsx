import { Component } from 'solid-js';
import { useI18n } from '../../shared/hooks/usei18n/usei18n.hook';
import Directive from '../components/Directive/Directive.component';
import Resource from '../components/Resource/Resource.component';
import WebComponents from '../components/WebComponents/WebComponents.component';

const PlaygroundPage: Component = () => {
  const [t] = useI18n();

  return (
    <main class="flex min-h-screen flex-col items-center justify-center space-y-5 px-10 py-20 duration-300 md:px-24 lg:px-40 xl:px-52">
      <h1
        data-testid="title"
        class="mb-10 text-2xl font-semibold tracking-wider text-primary-content"
      >
        {t('playgroundTitle')}
      </h1>

      <Resource />
      <Directive />
      <WebComponents />
    </main>
  );
};

export default PlaygroundPage;
