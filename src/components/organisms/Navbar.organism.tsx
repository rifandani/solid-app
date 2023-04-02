import { Link, NavLink, useNavigate } from '@solidjs/router';
import { Component, For, ParentComponent, Show, onMount } from 'solid-js';
import { themeChange } from 'theme-change';
import solidLogo from '../../assets/solid.svg';
import { themes } from '../../constants/global.constant';
import { useAppStorage } from '../../hooks/useAppStorage/useAppStorage.hook';
import useAuth from '../../hooks/useAuth/useAuth.hook';
import { useI18n } from '../../hooks/usei18n/usei18n.hook';
import { Icon } from '../atoms';

interface NavbarMenuContentProps {
  onClickLogout: () => void;
}

const useNavbarVM = () => {
  useAuth();

  const navigate = useNavigate();
  const [, , { remove }] = useAppStorage();

  const onClickLogout = () => {
    // remove `user` key in local storage
    remove('user');

    // back to login
    navigate('/login');
  };

  onMount(() => {
    themeChange(false);
  });

  return { onClickLogout };
};

const NavbarMenuContent: Component<NavbarMenuContentProps> = (props) => {
  const [t] = useI18n();
  const [appStorage] = useAppStorage();

  return (
    <>
      <li>
        <NavLink
          href="/todos"
          class="link-hover link text-primary"
          activeClass="link-primary"
          inactiveClass="link-neutral"
        >
          Todos
        </NavLink>
      </li>
      <li>
        <NavLink
          href="/posts"
          class="link-hover link text-primary mx-0 lg:mx-3"
          activeClass="link-secondary"
          inactiveClass="link-neutral"
        >
          Posts
        </NavLink>
      </li>
      <li class="dropdown-bottom dropdown-end dropdown mt-3 lg:mt-0">
        <label
          tabIndex={0}
          class="btn-secondary btn text-secondary-content rounded-none normal-case"
        >
          {t('theme')}
        </label>

        <ul
          tabIndex={0}
          class="dropdown-content menu rounded-box bg-base-100 block max-h-60 w-52 overflow-y-auto p-2 shadow"
        >
          <For each={themes}>
            {(theme) => (
              <li>
                <button class="text-secondary capitalize" data-set-theme={theme}>
                  {theme}
                </button>
              </li>
            )}
          </For>
        </ul>
      </li>

      <Show when={!!appStorage.user}>
        <li class="ml-0 mt-auto lg:ml-3 lg:mt-0">
          <button class="btn-primary btn h-full normal-case" onClick={() => props.onClickLogout()}>
            {t('logout')} ({appStorage.user?.email})
          </button>
        </li>
      </Show>
    </>
  );
};

const Navbar: ParentComponent = (props) => {
  const vm = useNavbarVM();

  return (
    <nav class="drawer text-primary-content">
      <input id="my-nav-drawer" type="checkbox" class="drawer-toggle" />

      <section class="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div class="navbar bg-base-300 w-full">
          <div class="flex-none lg:hidden">
            <label for="my-nav-drawer" class="btn-ghost btn-square btn">
              <Icon.HamburgerMenu2 width={20} height={20} />
            </label>
          </div>

          <Link href="/" class="link-primary link mx-2 flex-1 px-2">
            <span class="flex items-center space-x-2 pl-2 text-2xl">
              <img src={solidLogo} alt="solid logo" class="h-8 w-8" />
              <p class="text-primary font-semibold">Solid Template</p>
            </span>
          </Link>

          <div class="hidden flex-none lg:block">
            <ul class="menu menu-horizontal">
              {/* <!-- Navbar menu content here --> */}
              <NavbarMenuContent onClickLogout={vm.onClickLogout} />
            </ul>
          </div>
        </div>

        {/* <!-- Page content here --> */}
        {props.children}
      </section>

      <section class="drawer-side">
        <label for="my-nav-drawer" class="drawer-overlay" />

        <ul class="menu bg-base-100 w-80 p-4">
          {/* <!-- Sidebar content here --> */}
          <NavbarMenuContent onClickLogout={vm.onClickLogout} />
        </ul>
      </section>
    </nav>
  );
};

export default Navbar;
