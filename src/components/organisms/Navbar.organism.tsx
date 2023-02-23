import { Link, NavLink, useNavigate } from '@solidjs/router';
import { Component, createSignal, Show } from 'solid-js';
import { appStore, setAppStore } from '../../app/Store.app';
import solidLogo from '../../assets/solid.svg';
import useAuth from '../../hooks/useAuth/useAuth.hook';
import { cn } from '../../utils/helper/helper.util';
import { Button } from '../atoms';

const useNavbarVM = () => {
  useAuth();
  const navigate = useNavigate();
  const [toggle, setToggle] = createSignal(false);

  const onClickLogout = () => {
    localStorage.removeItem('user');
    setAppStore('user', null);
    navigate('/login');
  };

  return { toggle, setToggle, onClickLogout };
};

const Navbar: Component = () => {
  const vm = useNavbarVM();

  return (
    <section class="bg-gray-400 font-sans leading-normal tracking-normal">
      <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6 fixed w-full z-10 top-0 duration-300">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <Link href="/" class="text-violet-500 no-underline hover:text-white hover:no-underline">
            <span class="flex items-center text-2xl pl-2 space-x-2">
              <img src={solidLogo} alt="solidLogo logo" class="w-8 h-8" />
              <p class="font-semibold">Solid Template</p>
            </span>
          </Link>
        </div>

        {/* hamburger menu */}
        <div class="block lg:hidden duration-300">
          <button
            class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
            onClick={() => vm.setToggle((prev) => !prev)}
          >
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          class={cn(
            'w-full flex-grow pt-6 lg:items-center lg:w-auto lg:block lg:pt-0 duration-300',
            vm.toggle() ? 'block' : 'hidden',
          )}
        >
          <ul class="list-reset lg:flex justify-end flex-1 items-center duration-300">
            <li class="mr-3">
              <NavLink
                href="/todos"
                class="inline-block py-2 px-4 hover:underline-offset-8 hover:underline"
                activeClass="text-white"
                inactiveClass="text-gray-500"
              >
                Todos
              </NavLink>
            </li>
            <li class="mr-3">
              <NavLink
                href="/posts"
                class="inline-block py-2 px-4 hover:underline-offset-8 hover:underline"
                activeClass="text-white"
                inactiveClass="text-gray-500"
              >
                Posts
              </NavLink>
            </li>

            <Show when={!!appStore.user}>
              <li class="mr-3">
                <Button.Outlined onClick={() => vm.onClickLogout()}>
                  Logout ({appStore.user?.email})
                </Button.Outlined>
              </li>
            </Show>
          </ul>
        </div>
      </nav>

      {/* <!--Container--> */}
      <div class="container shadow-lg mx-auto bg-red mt-24 md:mt-18 duration-300" />
    </section>
  );
};

export default Navbar;
