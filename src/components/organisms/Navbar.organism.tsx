import { Link, NavLink, useNavigate } from '@solidjs/router';
import { Component, For, onMount, ParentComponent, Show } from 'solid-js';
import { themeChange } from 'theme-change';
import { appStore, setAppStore } from '../../app/Store.app';
import solidLogo from '../../assets/solid.svg';
import { themes } from '../../constants/global.constant';
import useAuth from '../../hooks/useAuth/useAuth.hook';
import { Icon } from '../atoms';

interface NavbarMenuContentProps {
  onClickLogout: () => void;
}

const useNavbarVM = () => {
  useAuth();

  const navigate = useNavigate();

  const onClickLogout = () => {
    localStorage.removeItem('user');
    setAppStore('user', null);
    navigate('/login');
  };

  onMount(() => {
    themeChange(false);
  });

  return { onClickLogout };
};

const NavbarMenuContent: Component<NavbarMenuContentProps> = (props) => (
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
        class="link-hover link mx-0 text-primary lg:mx-3"
        activeClass="link-secondary"
        inactiveClass="link-neutral"
      >
        Posts
      </NavLink>
    </li>
    <li class="dropdown-bottom dropdown-end dropdown mt-3 lg:mt-0">
      <label tabIndex={0} class="btn-secondary btn rounded-none normal-case text-secondary-content">
        Theme
      </label>

      <ul
        tabIndex={0}
        class="dropdown-content menu rounded-box block max-h-60 w-52 overflow-y-auto bg-base-100 p-2 shadow"
      >
        <For each={themes}>
          {(theme) => (
            <li>
              <button class="capitalize text-secondary" data-set-theme={theme}>
                {theme}
              </button>
            </li>
          )}
        </For>
      </ul>
    </li>

    <Show when={!!appStore.user}>
      <li class="ml-0 mt-auto lg:ml-3 lg:mt-0">
        <button class="btn-primary btn h-full normal-case" onClick={() => props.onClickLogout()}>
          Logout ({appStore.user?.email})
        </button>
      </li>
    </Show>
  </>
);

const Navbar: ParentComponent = (props) => {
  const vm = useNavbarVM();

  return (
    <nav class="drawer text-primary-content">
      <input id="my-nav-drawer" type="checkbox" class="drawer-toggle" />

      <section class="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div class="navbar w-full bg-base-300">
          <div class="flex-none lg:hidden">
            <label for="my-nav-drawer" class="btn-ghost btn-square btn">
              <Icon.HamburgerMenu2 width={20} height={20} />
            </label>
          </div>

          <Link href="/" class="link-primary link mx-2 flex-1 px-2">
            <span class="flex items-center space-x-2 pl-2 text-2xl">
              <img src={solidLogo} alt="solidLogo logo" class="h-8 w-8" />
              <p class="font-semibold text-primary">Solid Template</p>
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

        <ul class="menu w-80 bg-base-100 p-4">
          {/* <!-- Sidebar content here --> */}
          <NavbarMenuContent onClickLogout={vm.onClickLogout} />
        </ul>
      </section>
    </nav>
  );
};

// OLD NAVBAR
// <section class="bg-gray-600 font-sans leading-normal tracking-normal">
//   <nav class="fixed top-0 z-10 flex w-full flex-wrap items-center justify-between bg-gray-800 p-6 duration-300">
//     <div class="mr-6 flex shrink-0 items-center text-white">
//       <Link href="/" class="text-violet-500 no-underline hover:text-white hover:no-underline">
//         <span class="flex items-center space-x-2 pl-2 text-2xl">
//           <img src={solidLogo} alt="solidLogo logo" class="h-8 w-8" />
//           <p class="font-semibold">Solid Template</p>
//         </span>
//       </Link>
//     </div>

//     {/* hamburger menu */}
//     <div class="block duration-300 lg:hidden">
//       <button
//         class="flex items-center rounded border border-gray-600 px-3 py-2 text-gray-500 hover:border-white hover:text-white"
//         onClick={() => vm.setToggle((prev) => !prev)}
//       >
//         <svg
//           class="h-3 w-3 fill-current"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <title>Menu</title>
//           <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
//         </svg>
//       </button>
//     </div>

//     <div
//       class={cn(
//         'w-full flex-grow pt-6 lg:items-center lg:w-auto lg:block lg:pt-0 duration-300',
//         vm.toggle() ? 'block' : 'hidden',
//       )}
//     >
//       <ul class="flex-1 items-center justify-end space-x-3 duration-300 lg:flex">
//         <li class="ml-3">
//           <NavLink
//             href="/todos"
//             class="inline-block py-2 px-4 hover:underline hover:underline-offset-8"
//             activeClass="text-white"
//             inactiveClass="text-gray-500"
//           >
//             Todos
//           </NavLink>
//         </li>
//         <li class="">
//           <NavLink
//             href="/posts"
//             class="inline-block py-2 px-4 hover:underline hover:underline-offset-8"
//             activeClass="text-white"
//             inactiveClass="text-gray-500"
//           >
//             Posts
//           </NavLink>
//         </li>
//         <li class="dropdown-bottom dropdown-end dropdown">
//           <label tabIndex={0} class="btn m-1 normal-case">
//             Theme
//           </label>

//           <ul
//             tabIndex={0}
//             class="dropdown-content menu rounded-box block max-h-60 w-52 overflow-y-auto bg-base-100 p-2 shadow"
//           >
//             <For each={themes}>
//               {(theme) => (
//                 <li>
//                   <button data-set-theme={theme} class="capitalize">
//                     {theme}
//                   </button>
//                 </li>
//               )}
//             </For>
//           </ul>
//         </li>

//         <Show when={!!appStore.user}>
//           <li class="">
//             <Button.Outlined onClick={() => vm.onClickLogout()}>
//               Logout ({appStore.user?.email})
//             </Button.Outlined>
//           </li>
//         </Show>
//       </ul>
//     </div>
//   </nav>

//   {/* <!--Container--> */}
//   <div class="container mx-auto mt-24 shadow-lg duration-300 md:mt-16" />
// </section>

export default Navbar;
