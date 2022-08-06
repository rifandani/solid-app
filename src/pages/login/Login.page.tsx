import { Link } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import { Button, Icon } from '../../components/atoms';
import {
  loginForm,
  loginFormErrors,
  onKeyUpEmail,
  onKeyUpPassword,
  onSubmitForm,
  useLoginPageVM,
} from './Login.vm';

const LoginPage: Component = () => {
  const { navigate } = useLoginPageVM();

  return (
    <main class="h-screen bg-white">
      <div class="flex w-full flex-wrap">
        {/* <!-- Login Section --> */}
        <article class="flex w-full flex-col md:w-1/2">
          <section class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
            <Link href="/">
              <a class="relative h-16 w-16 cursor-pointer">
                <Icon.Home class="hover:text-violet-800 rounded-full" />
              </a>
            </Link>
          </section>

          <section class="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
            <p class="text-center text-3xl">Welcome Back</p>

            {/* <!-- Start FORM --> */}
            <form
              class="flex flex-col pt-3 md:pt-8"
              onSubmit={onSubmitForm(navigate)}
            >
              {/* <!-- email --> */}
              <div class="flex flex-col pt-4">
                <label for="email" class="text-lg">
                  Email
                </label>

                <input
                  class="mt-1"
                  placeholder="Your email..."
                  name="email"
                  type="email"
                  required
                  autofocus
                  onKeyUp={onKeyUpEmail}
                  value={loginForm().email}
                />
              </div>

              {/* <!-- password --> */}
              <div class="flex flex-col pt-4">
                <label for="password" class="text-lg">
                  Password
                </label>

                <input
                  class="mt-1"
                  placeholder="Your password..."
                  type="password"
                  name="password"
                  minlength="8"
                  required
                  onKeyUp={onKeyUpPassword}
                  value={loginForm().password}
                />
              </div>

              <Show when={!!loginFormErrors()}>
                <div class="block pt-4">
                  <h2 class="font-semibold p-2 border rounded border-red-500 text-red-500 bg-red-50">
                    {loginFormErrors()}
                  </h2>
                </div>
              </Show>

              <Button.Solid class="mt-8" type="submit">
                Login
              </Button.Solid>
            </form>
            {/* <!-- End FORM --> */}

            <div class="pt-12 pb-12 text-center">
              <p>
                Don&apos;t have an account?{' '}
                <Link href="/register">
                  <a class="cursor-pointer font-semibold hover:text-violet-800">
                    Register here.
                  </a>
                </Link>
              </p>
            </div>
          </section>
        </article>

        {/* <!-- Image Section --> */}
        <article class="w-1/2 shadow-2xl">
          <span class="relative hidden h-screen w-full md:flex md:justify-center md:items-center">
            <img src="src/assets/online-payment.png" alt="login page cover" />
          </span>
        </article>
      </div>
    </main>
  );
};

export default LoginPage;
