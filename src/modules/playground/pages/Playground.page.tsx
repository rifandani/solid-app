import Directive from '@playground/components/Directive/Directive.component';
import Resource from '@playground/components/Resource/Resource.component';
import WebComponents from '@playground/components/WebComponents/WebComponents.component';
import { modes } from '@shared/constants/global.constant';
import { createColorMode } from '@shared/hooks/createColorMode/createColorMode.hook';
import { useI18n } from '@shared/hooks/usei18n/usei18n.hook';
import { Component } from 'solid-js';

const PlaygroundPage: Component = () => {
  const [t] = useI18n();
  createColorMode({
    modes,
    attribute: 'data-theme',
  });

  return (
    <main class="flex min-h-screen flex-col items-center justify-center space-y-5 px-10 py-20 duration-300 md:px-24 lg:px-40 xl:px-52">
      <h1 data-testid="title" class="mb-10 text-2xl font-semibold tracking-wider">
        {t('playgroundTitle')}
      </h1>

      <Resource />
      <Directive />
      <WebComponents />
    </main>
  );
};

export default PlaygroundPage;
