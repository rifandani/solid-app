import { Icon } from '@iconify-icon/solid';
import { Toast } from '@kobalte/core';
import { Component, Show } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import './style.css';

// #region INTERFACES
type ToasterProps = {
  type: 'success' | 'error' | 'info' | 'warning';
  toastId: number;
  title: string;
  description?: string;
};
// #endregion

const Toaster: Component<ToasterProps> = (props) => (
  <Toast.Root
    class={twMerge([
      `my-toast alert relative block w-full min-w-[20rem] max-w-[25rem] overflow-hidden p-0 shadow-lg`,
      `alert-${props.type}`,
    ])}
    toastId={props.toastId}
  >
    <div class="flex items-center justify-between p-3">
      <Toast.Title as="h3" class={twMerge([`font-bold`, `text-${props.type}-content`])}>
        {props.title}
      </Toast.Title>

      <Toast.CloseButton class="btn btn-ghost btn-xs">
        <Icon icon="lucide:x" height="1.5em" />
      </Toast.CloseButton>
    </div>

    <Show when={props?.description}>
      <Toast.Description
        as="p"
        class="line-clamp-3 max-w-[90%] whitespace-pre-wrap break-words px-3 pb-5 text-sm"
      >
        {props.description}
      </Toast.Description>
    </Show>

    <Toast.ProgressTrack class="h-2 w-full rounded-md bg-slate-300">
      <Toast.ProgressFill class="my-toast__progress-fill h-full rounded-md bg-secondary" />
    </Toast.ProgressTrack>
  </Toast.Root>
);

export default Toaster;
