import { Link, NavLink, useNavigate } from '@solidjs/router';
import clsx from 'clsx';
import { Component, createSignal, onMount, Show } from 'solid-js';
import { appStore, setAppStore } from '../../app/AppStore';
import watermelon from '../../assets/watermelon.png';
import { Button } from '../atoms';

const [toggle, setToggle] = createSignal(false);

const useNavbarVM = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    localStorage.removeItem('user');
    setAppStore('user', null);

    navigate('/login');
  };

  onMount(() => {
    const user = localStorage.getItem('user');

    if (!user) {
      navigate('/login');
    }

    if (user && !appStore.user) {
      setAppStore('user', JSON.parse(user));
    }
  });

  return { onClickLogout };
};

const Navbar: Component = () => {
  const { onClickLogout } = useNavbarVM();

  const className = () =>
    clsx([
      'w-full flex-grow pt-6 lg:items-center lg:w-auto lg:block lg:pt-0',
      toggle() ? 'block' : 'hidden',
    ]);

  return (
    <section class="bg-gray-400 font-sans leading-normal tracking-normal">
      <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6 fixed w-full z-10 top-0">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <Link
            href="/todos"
            class="text-violet-500 no-underline hover:text-white hover:no-underline"
          >
            <span class="flex items-center text-2xl pl-2 space-x-2">
              <img src={watermelon} alt="watermelon logo" class="w-12 h-12" />
              <p class="font-semibold">Solid App</p>
            </span>
          </Link>
        </div>

        {/* hamburger menu */}
        <div class="block lg:hidden">
          <button
            class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
            onClick={() => setToggle((prev) => !prev)}
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

        <div class={className()}>
          <ul class="list-reset lg:flex justify-end flex-1 items-center">
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
                <Button.Outlined onClick={onClickLogout}>
                  Logout
                </Button.Outlined>
              </li>
            </Show>
          </ul>
        </div>
      </nav>

      {/* <!--Container--> */}
      <div class="container shadow-lg mx-auto bg-red mt-24 md:mt-18"></div>
    </section>
  );
};

export default Navbar;
