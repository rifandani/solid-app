import { ButtonOnClick } from '@shared/types/form.type';
import { ComponentType, customElement, noShadowDOM } from 'solid-element';
import { createEffect, createSignal } from 'solid-js';
import {
  MyCounterProps,
  myCounterEventDecrement,
  myCounterEventIncrement,
} from './MyCounter.constant';

const MyCounter: ComponentType<MyCounterProps> = (props) => {
  // disable shadow dom to apply tailwind class
  noShadowDOM();

  const [count, setCount] = createSignal(props.initialCount);

  // #region HANDLERS
  const onDecrement: ButtonOnClick = (ev) => {
    const newCount = (Number(count()) - 1).toString();

    setCount(newCount);
    ev.currentTarget.dispatchEvent(
      new CustomEvent(myCounterEventDecrement, {
        bubbles: true,
        composed: true, // to cross the Shadow DOM boundaries
        detail: { count: newCount },
      }),
    );
  };

  const onIncrement: ButtonOnClick = (ev) => {
    const newCount = (Number(count()) + 1).toString();

    setCount(newCount);
    ev.currentTarget.dispatchEvent(
      new CustomEvent(myCounterEventIncrement, {
        bubbles: true,
        composed: true, // to cross the Shadow DOM boundaries
        detail: { count: newCount },
      }),
    );
  };
  // #endregion

  // sync the props to `count` state
  createEffect(() => {
    setCount(props.initialCount);
  });

  return (
    <div part="containerPart" class="flex items-center space-x-2">
      <button part="btnPart" class="btn btn-secondary btn-xs" onClick={onDecrement}>
        Decrement
      </button>
      <p part="countPart">{count()}</p>
      <button part="btnPart" class="btn btn-secondary btn-xs" onClick={onIncrement}>
        Increment
      </button>
    </div>
  );
};

export default customElement('my-counter', { initialCount: '0' }, MyCounter);
