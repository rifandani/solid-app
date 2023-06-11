import { Component, JSX, splitProps } from 'solid-js';

// #region INTERFACES
type SVGProps = JSX.SvgSVGAttributes<SVGSVGElement>;
// #endregion

export const Home: Component<SVGProps> = (props) => {
  const [, rest] = splitProps(props, ['class', 'width', 'height']);

  return (
    <svg
      class={props.class}
      width={props.width || 24}
      height={props.height || 24}
      viewBox={props.viewBox || `0 0 ${props.width || 24} ${props.height || 24}`}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fill="currentColor"
        d="M12 2a1 1 0 00-.71.297l-10.087 8.8A.5.5 0 001 11.5a.5.5 0 00.5.5H4v8a1 1 0 001 1h4a1 1 0 001-1v-6h4v6a1 1 0 001 1h4a1 1 0 001-1v-8h2.5a.5.5 0 00.5-.5.5.5 0 00-.203-.402l-10.08-8.795a1 1 0 00-.006-.006A1 1 0 0012 2z"
      />
    </svg>
  );
};

export const SolidLogo: Component<SVGProps> = (props) => {
  const [, rest] = splitProps(props, ['class', 'width', 'height']);

  return (
    <svg
      class={props.class}
      width={props.width || 24}
      height={props.height || 24}
      viewBox={props.viewBox || `0 0 ${props.width || 24} ${props.height || 24}`}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fill="#76b3e1"
        d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z"
      />
      <linearGradient id="a" x1="27.5" x2="152" y1="3" y2="63.5" gradientUnits="userSpaceOnUse">
        <stop offset="0.1" stop-color="#76b3e1" />
        <stop offset="0.3" stop-color="#dcf2fd" />
        <stop offset="1" stop-color="#76b3e1" />
      </linearGradient>
      <path
        fill="url(#a)"
        d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z"
        opacity="0.3"
      />
      <path fill="#518ac8" d="M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z" />
      <linearGradient id="b" x1="95.8" x2="74" y1="32.6" y2="105.2" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#76b3e1" />
        <stop offset="0.5" stop-color="#4377bb" />
        <stop offset="1" stop-color="#1f3b77" />
      </linearGradient>
      <path
        fill="url(#b)"
        d="M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z"
        opacity="0.3"
      />
      <linearGradient
        id="c"
        x1="18.4"
        x2="144.3"
        y1="64.2"
        y2="149.8"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#315aa9" />
        <stop offset="0.5" stop-color="#518ac8" />
        <stop offset="1" stop-color="#315aa9" />
      </linearGradient>
      <path fill="url(#c)" d="M134 80a45 45 0 00-48-15L24 85 4 120l112 19 20-36c4-7 3-15-2-23z" />
      <linearGradient
        id="d"
        x1="75.2"
        x2="24.4"
        y1="74.5"
        y2="260.8"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#4377bb" />
        <stop offset="0.5" stop-color="#1a336b" />
        <stop offset="1" stop-color="#1a336b" />
      </linearGradient>
      <path fill="url(#d)" d="M114 115a45 45 0 00-48-15L4 120s53 40 94 30l3-1c17-5 23-21 13-34z" />
    </svg>
  );
};

export const HamburgerMenu: Component<SVGProps> = (props) => {
  const [, rest] = splitProps(props, ['class', 'width', 'height']);

  return (
    <svg
      class={props.class}
      width={props.width || 24}
      height={props.height || 24}
      viewBox={props.viewBox || `0 0 ${props.width || 24} ${props.height || 24}`}
      fill={props.fill || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

export const HamburgerMenu2: Component<SVGProps> = (props) => {
  const [, rest] = splitProps(props, ['class', 'width', 'height']);

  return (
    <svg
      class={props.class}
      width={props.width || 16}
      height={props.height || 16}
      viewBox={props.viewBox || `0 0 ${props.width || 16} ${props.height || 16}`}
      fill={props.fill || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <title>Hamburger Menu</title>
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
  );
};

export const Error: Component<SVGProps> = (props) => {
  const [, rest] = splitProps(props, ['class', 'width', 'height']);

  return (
    <svg
      class={props.class}
      width={props.width || 16}
      height={props.height || 16}
      viewBox={props.viewBox || `0 0 ${props.width || 16} ${props.height || 16}`}
      fill={props.fill || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <title>Error</title>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
