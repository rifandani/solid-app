import type { JSX } from 'solid-js';

export type FormOnSubmitEvent = Event & {
  submitter: HTMLElement;
} & {
  currentTarget: HTMLFormElement;
  target: Element;
};

export type InputOnChangeEvent = Event & {
  currentTarget: HTMLInputElement;
  target: Element;
};

export type FormOnSubmit =
  | JSX.EventHandlerUnion<
      HTMLFormElement,
      Event & {
        submitter: HTMLElement;
      }
    >
  | undefined;

export type InputOnInput = JSX.EventHandlerUnion<HTMLInputElement, InputEvent> | undefined;

export type InputOnChange = JSX.EventHandlerUnion<HTMLInputElement, Event> | undefined;

export type InputOnKeyUp =
  | JSX.EventHandlerUnion<HTMLInputElement | HTMLTextAreaElement, KeyboardEvent>
  | undefined;

export type ButtonOnClick = JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;

export type SelectOnChange = JSX.EventHandlerUnion<HTMLSelectElement, Event> | undefined;
