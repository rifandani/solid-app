import { NavLink } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';
import { themes } from '../../../constants/global.constant';
import useNavbarMenuContent from './useNavbarMenuContent.hook';

const NavbarMenuContent: Component = () => {
  const { t, appStorage, handleClickLogout } = useNavbarMenuContent();

  return (
    <>
      <li>
        <NavLink
          href="/todos"
          class="link-hover link mx-0 tracking-wide text-primary lg:mx-3"
          activeClass="link-secondary"
          inactiveClass="link-neutral"
        >
          Todos
        </NavLink>
      </li>
      <li class="dropdown-top dropdown mb-3 mt-auto lg:dropdown-bottom lg:dropdown-end lg:my-0">
        <button
          tabIndex={0}
          class="btn-secondary btn-block btn-sm btn normal-case text-secondary-content"
        >
          {t('theme')}
        </button>

        <ul
          tabIndex={0}
          class="dropdown-content menu rounded-box z-10 block max-h-60 w-72 overflow-y-auto bg-secondary p-2 text-secondary-content shadow lg:w-52"
        >
          <For each={themes}>
            {(theme) => (
              <li>
                <button class="capitalize tracking-wide" data-set-theme={theme}>
                  {theme}
                </button>
              </li>
            )}
          </For>
        </ul>
      </li>

      <Show when={!!appStorage.user}>
        <li class="ml-0 lg:ml-3 lg:mt-0">
          <button
            class="btn-primary btn-sm btn normal-case tracking-wide text-primary-content"
            onClick={handleClickLogout}
          >
            {t('logout')} ({appStorage.user?.username})
          </button>
        </li>
      </Show>
    </>
  );
};

export default NavbarMenuContent;
