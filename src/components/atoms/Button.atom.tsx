import { Component, JSX, splitProps } from 'solid-js';
import { cn } from '../../utils/cn.util';

// #region INTERFACES
export type BaseProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: JSX.Element;

  roundedFull?: boolean;
  size?: 'sm' | 'md' | 'lg';
};
// #endregion

const baseButtonClasses =
  'font-semibold items-center justify-center inline-flex space-x-2 select-none cursor-pointer duration-200';
const solidButtonClasses =
  'text-white bg-violet-800 border-0 ring-violet-800 hover:bg-violet-500 active:bg-violet-200 focus:ring-4 disabled:opacity-50';
const outlinedButtonClasses =
  'text-violet-500 box-border border border-solid border-violet-500 bg-transparent hover:bg-violet-50 active:border-violet-500';
const textButtonClasses =
  'text-violet border-none bg-transparent hover:opacity-70';
const buttonSizesClasses = {
  sm: 'text-sm py-1 px-4',
  md: 'text-md py-2.5 px-4',
  lg: 'text-md py-4 px-4',
};

export const Solid: Component<BaseProps> = (props) => {
  const [, rest] = splitProps(props, ['onClick']);

  return (
    <button
      class={cn([
        baseButtonClasses,
        solidButtonClasses,
        props.roundedFull ? 'rounded-full' : 'rounded',
        props.size === 'sm'
          ? buttonSizesClasses.sm
          : props.size === 'md'
          ? buttonSizesClasses.md
          : buttonSizesClasses.lg,
        props.class,
      ])}
      onClick={props.onClick}
      {...rest}
    >
      {props.children}
    </button>
  );
};

export const Outlined: Component<BaseProps> = (props) => {
  const [, rest] = splitProps(props, ['onClick']);

  return (
    <button
      class={cn([
        baseButtonClasses,
        outlinedButtonClasses,
        props.roundedFull ? 'rounded-full' : 'rounded',
        props.size === 'sm'
          ? buttonSizesClasses.sm
          : props.size === 'md'
          ? buttonSizesClasses.md
          : buttonSizesClasses.lg,
        props.class,
      ])}
      onClick={props.onClick}
      {...rest}
    >
      {props.children}
    </button>
  );
};

export const Text: Component<BaseProps> = (props) => {
  const [, rest] = splitProps(props, ['onClick']);

  return (
    <button
      class={cn([
        baseButtonClasses,
        textButtonClasses,
        props.roundedFull ? 'rounded-full' : 'rounded',
        props.size === 'sm'
          ? buttonSizesClasses.sm
          : props.size === 'md'
          ? buttonSizesClasses.md
          : buttonSizesClasses.lg,
        'p-0',
        props.class,
      ])}
      onClick={props.onClick}
      {...rest}
    >
      {props.children}
    </button>
  );
};
