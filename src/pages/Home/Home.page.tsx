import { Component, Show } from 'solid-js';
import { Button } from '../../components/atoms';
import { SolidLogo } from '../../components/atoms/Icon.atom';
import { Availability } from '../../configs/locale/locale.type';
import useHomePageVM from './Home.vm';

const HomePage: Component = () => {
  const vm = useHomePageVM();

  return (
    <main class="text-gray-600 body-font container mx-auto flex px-5 py-24 md:flex-row flex-col items-center duration-300">
      <div
        ref={(elem) => vm.setParent(elem)}
        class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center duration-300"
      >
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Solid App
          <br class="hidden lg:inline-block" />
          using <code>@solidjs/router</code>
        </h1>
        <p class="mb-8 leading-relaxed">
          With <code>typescript</code>, <code>vite</code>,{' '}
          <code>vitest + @solidjs/testing-library</code>, <code>@solidjs/router</code>,{' '}
          <code>msw</code>, <code>tailwindcss</code>.
        </p>

        <Show when={vm.clock.toggle()} keyed>
          <p class="mb-8 leading-relaxed font-mono font-extrabold">
            {vm.clock.hours()} : {vm.clock.minutes()} : {vm.clock.seconds()}{' '}
          </p>
        </Show>

        <div class="flex justify-center space-x-3">
          <Button.Text onClick={() => vm.clock.toggleClock()}>
            {vm.translator.translate('Toggle Clock')}
          </Button.Text>

          <Button.Outlined
            onClick={() =>
              vm.translator.changeLanguage((lang) =>
                lang === Availability.en ? Availability.id : Availability.en,
              )
            }
          >
            {vm.translator.translate('Change Language')}
          </Button.Outlined>

          <Button.Solid onClick={() => vm.navigate('/todos')}>
            {vm.translator.translate('Get Started')}
          </Button.Solid>
        </div>
      </div>

      <div class="lg:max-w-lg lg:w-full md:w-1/2 duration-300">
        <SolidLogo width={200} height={200} />
      </div>
    </main>
  );
};

export default HomePage;
