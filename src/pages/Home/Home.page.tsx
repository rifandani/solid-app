import { Component, Show } from 'solid-js';
import { Availability } from '../../configs/locale/locale.type';
import useHomePageVM from './Home.vm';

const HomePage: Component = () => {
  const vm = useHomePageVM();

  return (
    <main
      ref={(elem) => vm.setParent(elem)}
      class="container mx-auto flex flex-col items-center py-24 text-primary-content duration-300"
    >
      <h1 class="mb-4 text-3xl font-medium text-primary-content sm:text-4xl">Solid App using:</h1>

      <div class="mockup-code">
        <pre data-prefix="$">
          <code>pnpm add @solidjs/router @tanstack/solid-query zod @formkit/auto-animate ...</code>
        </pre>
        <pre data-prefix="$">
          <code>
            pnpm add -D typescript vite vitest @solidjs/testing-library msw tailwindcss daisyui ...
          </code>
        </pre>
      </div>

      <Show when={vm.clock.toggle()} keyed>
        <div class="stats mt-8 shadow">
          <div class="stat">
            <div class="stat-title">Clock:</div>
            <div class="stat-value">
              {vm.clock.hours()} : {vm.clock.minutes()} : {vm.clock.seconds()}{' '}
            </div>
            <div class="stat-desc">Click toggle clock to restart the clock</div>
          </div>
        </div>
      </Show>

      <div class="mt-8 grid grid-cols-1 gap-2 duration-300 sm:grid-cols-2 md:grid-cols-3">
        <button class="btn-active btn" onClick={() => vm.clock.toggleClock()}>
          {vm.translator.translate('Toggle Clock')} 🕰
        </button>

        <button
          class="btn-secondary btn"
          onClick={() =>
            vm.translator.changeLanguage((lang) =>
              lang === Availability.en ? Availability.id : Availability.en,
            )
          }
        >
          {vm.translator.translate('Change Language')} ♻
        </button>

        <button class="btn-accent btn" onClick={() => vm.navigate('/todos')}>
          {vm.translator.translate('Get Started')} ✨
        </button>
      </div>
    </main>
  );
};

export default HomePage;
