import { Icon } from '@iconify-icon/solid';
import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import solidjs from '../../../../assets/solidjs.webp';
import LoginForm from '../../components/LoginForm/LoginForm.component';
import useLoginPageVM from './Login.vm';

const LoginPage: Component = () => {
  const vm = useLoginPageVM();

  return (
    <main class="h-screen bg-white">
      <div class="flex w-full flex-wrap">
        {/* <!-- Login Section --> */}
        <section class="flex w-full flex-col md:w-1/2">
          <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
            <Link href="/" class="relative cursor-pointer rounded-full hover:text-primary">
              <Icon icon="lucide:home" height="1.5em" />
            </Link>
          </div>

          <div class="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
            <p class="text-center text-3xl text-primary" data-testid="title">
              {vm.t('welcome')}
            </p>

            <LoginForm />

            <div class="py-12 text-center">
              <p>
                {vm.t('noAccount')}{' '}
                <Link class="link-primary link" href="/register">
                  {vm.t('registerHere')}
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* <!-- Image Section --> */}
        <section class="w-1/2 shadow-2xl">
          <span class="relative hidden h-screen w-full md:flex md:items-center md:justify-center">
            <img
              src={solidjs}
              alt="login page cover"
              loading="lazy"
              class="h-full object-cover object-right"
            />
          </span>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
