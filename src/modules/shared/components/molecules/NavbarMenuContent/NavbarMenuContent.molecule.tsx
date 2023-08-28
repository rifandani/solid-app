import { NavLink } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';
import { themes } from '../../../constants/global.constant';
import useNavbarMenuContent from './useNavbarMenuContent.hook';

const NavbarMenuContent: Component = () => {
  const { t, appStorage, setTheme, handleClickLogout } = useNavbarMenuContent();

  return (
    <>
      <li>
        <NavLink
          href="/todos"
          class="link-hover link mx-0 px-3 tracking-wide text-primary lg:mx-3"
          activeClass="link-secondary"
          inactiveClass="link-neutral"
          aria-label="todos"
        >
          Todos
        </NavLink>
      </li>

      <li class="dropdown dropdown-top mb-3 mt-auto lg:dropdown-end lg:dropdown-bottom lg:my-0">
        <button
          type="button"
          tabIndex={0}
          aria-label="themes-opener"
          class="btn btn-secondary btn-sm btn-block normal-case text-secondary-content"
        >
          {t('theme')}
        </button>

        <ul class="menu dropdown-content rounded-box z-10 block max-h-60 w-72 overflow-y-auto bg-secondary p-2 text-secondary-content shadow lg:w-52">
          <For each={themes}>
            {(theme) => (
              <li>
                <button
                  type="button"
                  class="capitalize tracking-wide"
                  aria-label={`theme-${theme}`}
                  onClick={() => setTheme(theme)}
                >
                  {theme}
                </button>
              </li>
            )}
          </For>
        </ul>
      </li>

      <Show when={appStorage.user}>
        {(user) => (
          <li class="ml-0 lg:ml-3 lg:mt-0">
            <button
              type="button"
              class="btn btn-primary btn-sm normal-case tracking-wide text-primary-content"
              onClick={handleClickLogout}
            >
              {t('logout')} ({user().username})
            </button>
          </li>
        )}
      </Show>
    </>
  );
};

export default NavbarMenuContent;
