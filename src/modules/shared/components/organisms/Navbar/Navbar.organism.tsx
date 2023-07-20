import { Icon } from '@iconify-icon/solid';
import { Link } from '@solidjs/router';
import { ParentComponent } from 'solid-js';
import { SvgIcon } from '../../atoms';
import { NavbarMenuContent } from '../../molecules';
import useNavbar from './useNavbar.hook';

const Navbar: ParentComponent = (props) => {
  const { t } = useNavbar();

  return (
    <nav class="drawer min-h-screen text-primary-content">
      <input id="my-nav-drawer" type="checkbox" class="drawer-toggle" />

      <section class="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div class="navbar w-full bg-base-300">
          <div class="flex-none lg:hidden">
            <label for="my-nav-drawer" class="btn btn-square btn-ghost">
              <Icon icon="lucide:menu" height="2em" class="text-primary-content" />
            </label>
          </div>

          <Link href="/" class="link-primary link mx-2 flex-1 px-2">
            <span class="flex items-center space-x-2 pl-2 text-2xl">
              <SvgIcon id="icon-solidjs" class="h-6 w-6" />
              <p class="font-semibold tracking-wider text-primary">{t('appName')}</p>
            </span>
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
        <label for="my-nav-drawer" class="drawer-overlay" />

        <ul class="menu h-full w-80 bg-base-200 p-4">
          {/* <!-- Sidebar content here --> */}
          <NavbarMenuContent />
        </ul>
      </section>
    </nav>
  );
};

export default Navbar;
