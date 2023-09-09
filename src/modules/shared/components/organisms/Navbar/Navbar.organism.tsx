import { Icon } from '@iconify-icon/solid';
import { SvgIcon } from '@shared/components/atoms';
import { NavbarMenuContent } from '@shared/components/molecules';
import { Link } from '@solidjs/router';
import { ParentComponent } from 'solid-js';
import useNavbar from './useNavbar.hook';

const Navbar: ParentComponent = (props) => {
  const { t } = useNavbar();

  return (
    <nav class="drawer min-h-screen">
      <input id="my-nav-drawer" type="checkbox" aria-label="drawer" class="drawer-toggle" />

      <section class="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div class="navbar w-full shadow-md">
          <div class="flex-none lg:hidden">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label for="my-nav-drawer" class="btn btn-square btn-ghost">
              <Icon icon="lucide:menu" height="2em" />
            </label>
          </div>

          <Link
            href="/"
            aria-label="logo"
            class="link mx-2 flex flex-1 items-center space-x-2 px-2 text-2xl"
          >
            <SvgIcon id="icon-solidjs" class="h-6 w-6" />
            <p class="font-semibold tracking-wider">{t('appName')}</p>
          </Link>

          <div class="hidden flex-none lg:block">
            <ul class="menu menu-horizontal">
              {/* <!-- Navbar menu content here --> */}
              <NavbarMenuContent />
            </ul>
          </div>
        </div>

        {/* <!-- Page content here --> */}
        {props.children || <h1 class="text-lg/10">{t('noPageContent')}</h1>}
      </section>

      <section class="drawer-side">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label for="my-nav-drawer" class="drawer-overlay" />

        <ul class="menu h-full w-80 bg-base-100 p-4">
          {/* <!-- Sidebar content here --> */}
          <NavbarMenuContent />
        </ul>
      </section>
    </nav>
  );
};

export default Navbar;
