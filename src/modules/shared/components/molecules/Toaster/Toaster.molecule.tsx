import { Icon } from '@iconify-icon/solid';
import { Toast } from '@kobalte/core';
import { Component, Show } from 'solid-js';
import { twJoin } from 'tailwind-merge';
import './style.css';

// #region INTERFACES
type ToastComponentProps = {
  toastId: number;
};
type ToasterProps = ToastComponentProps & {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
};
// #endregion

const Toaster: Component<ToasterProps> = (props) => {
  const mapper = {
    root: {
      success: 'alert-success',
      error: 'alert-error',
      info: 'alert-info',
      warning: 'alert-warning',
    },
    text: {
      success: 'text-success-content',
      error: 'text-error-content',
      info: 'text-info-content',
      warning: 'text-warning-content',
    },
    progress: {
      success: 'bg-success-content',
      error: 'bg-error-content',
      info: 'bg-info-content',
      warning: 'bg-warning-content',
    },
  };

  return (
    <Toast.Root
      class={twJoin(
        `my-toast alert relative block w-full min-w-[20rem] max-w-[25rem] overflow-hidden p-0 shadow-lg`,
        mapper.root[props.type],
      )}
      toastId={props.toastId}
    >
      <div class="flex items-center justify-between p-3">
        <Toast.Title as="h3" class={twJoin(`font-bold`, mapper.text[props.type])}>
          {props.title}
        </Toast.Title>

        <Toast.CloseButton class="btn btn-ghost btn-xs">
          <Icon icon="lucide:x" height="1.5em" />
        </Toast.CloseButton>
      </div>

      <Show when={props?.description}>
        <Toast.Description
          as="p"
          class={twJoin(
            'line-clamp-3 max-w-[90%] whitespace-pre-wrap break-words px-3 pb-5 text-sm',
            mapper.text[props.type],
          )}
        >
          {props.description}
        </Toast.Description>
      </Show>

      <Toast.ProgressTrack class="h-2 w-full rounded-md">
        <Toast.ProgressFill
          class={twJoin('my-toast__progress-fill h-full rounded-md', mapper.progress[props.type])}
        />
      </Toast.ProgressTrack>
    </Toast.Root>
  );
};

export default Toaster;
