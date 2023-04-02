import { shuffle } from '@rifandani/nxact-yutiriti';
import { Component, For, Show } from 'solid-js';
import useHomePageVM from './Home.vm';

const HomePage: Component = () => {
  const vm = useHomePageVM();

  return (
    <main
      ref={(elem) => vm.setParent(elem)}
      class="text-primary-content container mx-auto flex flex-col items-center py-24 duration-300"
    >
      <h1 class="text-primary-content mb-4 text-3xl font-medium sm:text-4xl">Solid App using:</h1>

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

      <div
        ref={(elem) => vm.setParent(elem)}
        class="mt-8 grid grid-cols-1 gap-2 duration-300 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <For each={vm.buttons()}>
          {(value) => (
            <button
              class={value.class}
              onClick={
                value.id === 'sort' ? () => vm.setButtons((prev) => shuffle(prev)) : value.onClick
              }
            >
              {value.text}
            </button>
          )}
        </For>
      </div>
    </main>
  );
};

export default HomePage;
