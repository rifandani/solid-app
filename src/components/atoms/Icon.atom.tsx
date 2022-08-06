import { Component, JSX, splitProps } from 'solid-js';

type SVGProps = JSX.SvgSVGAttributes<SVGSVGElement>;

export const Home: Component<SVGProps> = (props) => {
  const [, rest] = splitProps(props, ['class', 'width', 'height']);

  return (
    <svg
      class={props.class}
      width={props.width || 24}
      height={props.height || 24}
      viewBox={`0 0 ${props.width} ${props.height}`}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fill="currentColor"
        d="M12 2a1 1 0 00-.71.297l-10.087 8.8A.5.5 0 001 11.5a.5.5 0 00.5.5H4v8a1 1 0 001 1h4a1 1 0 001-1v-6h4v6a1 1 0 001 1h4a1 1 0 001-1v-8h2.5a.5.5 0 00.5-.5.5.5 0 00-.203-.402l-10.08-8.795a1 1 0 00-.006-.006A1 1 0 0012 2z"
      ></path>
    </svg>
  );
};
