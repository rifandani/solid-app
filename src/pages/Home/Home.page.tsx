import { Component } from 'solid-js';
import { Button } from '../../components/atoms';
import { SolidLogo } from '../../components/atoms/Icon.atom';
import { useHomePageVM } from './Home.vm';

const HomePage: Component = () => {
  const { navigate } = useHomePageVM();

  return (
    <section class="text-gray-600 body-font">
      <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            SPA-based Solid App
            <br class="hidden lg:inline-block" />
            using <code>@solidjs/router</code>
          </h1>
          <p class="mb-8 leading-relaxed">
            With <code>tailwindcss</code>, <code>json-server</code>,{' '}
            <code>axios</code>, & <code>clsx</code>.
          </p>
          <div class="flex justify-center">
            <Button.Solid onClick={() => navigate('/todos')}>
              Get Started
            </Button.Solid>
          </div>
        </div>

        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <SolidLogo width={200} height={200} />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
