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
      <h1 class="text-3xl font-medium text-primary-content sm:text-4xl">{vm.t('title')}</h1>

      <HomeClock />
    </main>
  );
};

export default HomePage;
