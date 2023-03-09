import { Link } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import { Icon } from '../../components/atoms';
import useLoginPageVM from './Login.vm';

const LoginPage: Component = () => {
  const vm = useLoginPageVM();

  return (
    <main class="h-screen bg-white">
      <div class="flex w-full flex-wrap">
        {/* <!-- Login Section --> */}
        <section class="flex w-full flex-col md:w-1/2">
          <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
            <Link href="/" class="relative cursor-pointer">
              <Icon.Home class="h-8 w-8 rounded-full hover:text-primary" />
            </Link>
          </div>

          <div class="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
            <p class="text-center text-3xl text-primary">Welcome Back</p>

            {/* <!-- Start FORM --> */}
            <form class="form-control pt-3 md:pt-8" onSubmit={(ev) => vm.form.onSubmitForm(ev)}>
              {/* <!-- email --> */}
              <div class="form-control pt-4">
                <label class="label" for="email">
                  <span class="label-text">Email</span>
                </label>

                <input
                  class="input-bordered input-primary input mt-1 shadow-md"
                  placeholder="Your email..."
                  name="email"
                  type="email"
                  required
                  autofocus
                  onKeyUp={vm.form.onKeyUpEmail}
                  value={vm.form.form().email}
                />
              </div>

              {/* <!-- password --> */}
              <div class="form-control pt-4">
                <label class="label" for="password">
                  <span class="label-text">Password</span>
                </label>

                <input
                  class="input-bordered input-primary input mt-1 shadow-md"
                  placeholder="Your password..."
                  type="password"
                  name="password"
                  minlength="8"
                  required
                  onKeyUp={vm.form.onKeyUpPassword}
                  value={vm.form.form().password}
                />
              </div>

              <Show when={vm.form.loginMutation.isError}>
                <div class="alert alert-error mt-3 shadow-lg">
                  <div class="flex flex-col items-start">
                    <span>❌ Form error: </span>
                    <span>{String(vm.form.loginMutation.error)}</span>
                  </div>
                </div>
              </Show>

              <button
                class="btn-primary btn mt-8 normal-case"
                type="submit"
                disabled={vm.form.loginMutation.isLoading}
              >
                {vm.form.loginMutation.isLoading ? 'Logging in...' : 'Login 🎁'}
              </button>
            </form>
            {/* <!-- End FORM --> */}

            <div class="py-12 text-center">
              <p>
                Don&apos;t have an account?{' '}
                <Link class="link-primary link" href="/register">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* <!-- Image Section --> */}
        <section class="w-1/2 shadow-2xl">
          <span class="relative hidden h-screen w-full md:flex md:items-center md:justify-center">
            <img src="src/assets/online-payment.png" alt="login page cover" />
          </span>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
