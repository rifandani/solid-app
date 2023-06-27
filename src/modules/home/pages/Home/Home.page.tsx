import { Component } from 'solid-js';
import HomeClock from '../../components/HomeClock/HomeClock.component';
import useHomePageVM from './Home.vm';

const HomePage: Component = () => {
  const vm = useHomePageVM();

  return (
    <main
      ref={(elem) => vm.setParent(elem)}
      class="container mx-auto flex flex-col items-center py-24 text-primary-content duration-300"
    >
      <h1 class="mb-4 text-3xl font-medium text-primary-content sm:text-4xl">{vm.t('title')}</h1>

      <section class="mockup-code">
        <code class="block px-6">
          pnpm add @solidjs/router @tanstack/solid-query zod @formkit/auto-animate @felte/solid ...
        </code>
        <code class="px-6">
          pnpm add -D typescript vite vitest @solidjs/testing-library msw tailwindcss daisyui ...
        </code>
      </section>

      <HomeClock />
    </main>
  );
};

export default HomePage;
