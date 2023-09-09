import { themes } from '@shared/constants/global.constant';
import { NavLink } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';
import useNavbarMenuContent from './useNavbarMenuContent.hook';

const NavbarMenuContent: Component = () => {
  const { t, appStorage, setTheme, handleClickLogout } = useNavbarMenuContent();

  return (
    <>
      <li>
        <NavLink
          href="/todos"
          class="link mx-0 px-3 tracking-wide lg:mx-3"
          activeClass="link-hover"
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
          class="btn btn-outline btn-sm btn-block normal-case"
        >
          {t('theme')}
        </button>

        <ul class="menu dropdown-content rounded-box z-10 block max-h-60 w-72 overflow-y-auto bg-base-200 p-2 shadow lg:w-52">
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
              class="btn btn-error btn-sm normal-case tracking-wide text-error-content"
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
