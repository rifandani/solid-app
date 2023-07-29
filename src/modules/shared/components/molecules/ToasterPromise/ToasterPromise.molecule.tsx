import { Icon } from '@iconify-icon/solid';
import { Toast } from '@kobalte/core';
import { JSX, Show } from 'solid-js';

// #region INTERFACES
type ToasterPromiseProps<T, U> = {
  toastId: number;
  promise: Promise<T> | (() => Promise<T>);
  options: {
    loading?: JSX.Element;
    success?: (data: T) => JSX.Element;
    error?: (error: U) => JSX.Element;
  };
  title: string;
  description?: string;
};
// #endregion

// TODO: work in progress
const ToasterPromise = <T, U>(props: ToasterPromiseProps<T, U>): JSX.Element => (
  <Toast.Root class="alert relative overflow-hidden shadow-lg" toastId={props.toastId}>
    <div>
      <Toast.Title as="h3" class="font-bold">
        {props.title}
      </Toast.Title>

      <Show when={props?.description}>
        <Toast.Description as="p" class="toast__description">
          {props.description}
        </Toast.Description>
      </Show>

      <Toast.ProgressTrack class="h-8 w-full rounded-md bg-slate-300">
        <Toast.ProgressFill class="h-full rounded-md bg-primary" />
      </Toast.ProgressTrack>
    </div>

    <div class="flex-none">
      <Toast.CloseButton class="btn btn-sm">
        <Icon icon="lucide:x" height="1.5em" />
      </Toast.CloseButton>
    </div>
  </Toast.Root>
);

export default ToasterPromise;
