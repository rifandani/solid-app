import { Component, JSX, splitProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

// #region INTERFACES
export type BaseProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: JSX.Element;
  roundedFull?: boolean;
  size?: 'sm' | 'md' | 'lg';
};
// #endregion

const buttonSizesClasses = {
  sm: 'text-sm py-1 px-4',
  md: 'text-md py-2.5 px-4',
  lg: 'text-md py-4 px-4',
};

export const Solid: Component<BaseProps> = (props) => {
  const [, rest] = splitProps(props, ['onClick', 'class']);

  return (
    <button
      class={twMerge(
        'inline-flex cursor-pointer select-none items-center justify-center space-x-2 border-0 bg-violet-800 font-semibold text-white ring-violet-800 duration-200 hover:bg-violet-500 focus:ring-4 active:bg-violet-200 disabled:opacity-50',
        props.roundedFull ? 'rounded-full' : 'rounded',
        props.size === 'sm'
          ? buttonSizesClasses.sm
          : props.size === 'md'
          ? buttonSizesClasses.md
          : buttonSizesClasses.lg,
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

export const Outlined: Component<BaseProps> = (props) => {
  const [, rest] = splitProps(props, ['onClick', 'class']);

  return (
    <button
      class={twMerge(
        'box-border inline-flex cursor-pointer select-none items-center justify-center space-x-2 border border-solid border-violet-500 bg-transparent font-semibold text-violet-500 ring-violet-800 duration-200 hover:bg-violet-50 focus:ring-4 active:border-violet-500 disabled:opacity-50',
        props.roundedFull ? 'rounded-full' : 'rounded',
        props.size === 'sm'
          ? buttonSizesClasses.sm
          : props.size === 'md'
          ? buttonSizesClasses.md
          : buttonSizesClasses.lg,
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

export const Text: Component<BaseProps> = (props) => {
  const [, rest] = splitProps(props, ['onClick', 'class']);

  return (
    <button
      class={twMerge(
        'inline-flex cursor-pointer select-none items-center justify-center space-x-2 border-none bg-transparent p-0 font-semibold text-violet-500 duration-200 hover:opacity-70',
        props.roundedFull ? 'rounded-full' : 'rounded',
        props.size === 'sm'
          ? buttonSizesClasses.sm
          : props.size === 'md'
          ? buttonSizesClasses.md
          : buttonSizesClasses.lg,
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
