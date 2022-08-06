import clsx from 'clsx';
import { Component, JSX, splitProps } from 'solid-js';

// #region INTERFACES
export type IconButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: JSX.Element;

  roundedFull?: boolean;
};
// #endregion

const baseIconButton =
  'text-black flex items-center p-2 rounded-full duration-200 cursor-pointer hover:(bg-violet-200 bg-opacity-25)';

const IconButton: Component<IconButtonProps> = (props) => {
  const [, rest] = splitProps(props, ['onClick']);

  const className = () =>
    clsx([
      baseIconButton,
      props.class,
      props.disabled && 'opacity-50 hover:(cursor-default bg-opacity-0)',
      props.roundedFull ? 'rounded-full' : 'rounded',
    ]);

  return (
    <button class={className()} onClick={props.onClick} {...rest}>
      {props.children}
    </button>
  );
};

export default IconButton;
