import { Component, JSX, splitProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

// #region INTERFACES
type IconButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: JSX.Element;
  roundedFull?: boolean;
};
// #endregion

const IconButton: Component<IconButtonProps> = (props) => {
  const [, rest] = splitProps(props, ['onClick']);

  return (
    <button
      class={twMerge(
        'hover:(bg-violet-200 bg-opacity-25) flex cursor-pointer items-center rounded-full p-2 text-black duration-200',
        props.disabled && 'hover:(cursor-default bg-opacity-0) opacity-50',
        props.roundedFull ? 'rounded-full' : 'rounded',
        props.class,
      )}
      // eslint-disable-next-line solid/reactivity
      onClick={props.onClick}
      {...rest}
    >
      {props.children}
    </button>
  );
};

export default IconButton;
