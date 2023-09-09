import {
  myCounterEventDecrement,
  myCounterEventIncrement,
  type MyCounterEventDetail,
} from '@lib/wc/MyCounter.constant';
import '@lib/wc/MyCounter.wc';
import { ButtonOnClick } from '@shared/types/form.type';
import { Component, createSignal, onCleanup, onMount } from 'solid-js';

const WebComponents: Component = () => {
  let sectionRef: HTMLElement;
  const [initialCount, setInitialCount] = createSignal('10');

  const handleClickTambah: ButtonOnClick = () => {
    setInitialCount((Number(initialCount()) + 1).toString());
  };

  const onDecrement: EventListenerOrEventListenerObject = (ev) => {
    const customEv = ev as CustomEvent<MyCounterEventDetail>;
    setInitialCount(customEv.detail.count);
  };
  const onIncrement: EventListenerOrEventListenerObject = (ev) => {
    const customEv = ev as CustomEvent<MyCounterEventDetail>;
    setInitialCount(customEv.detail.count);
  };

  onMount(() => {
    sectionRef.addEventListener(myCounterEventDecrement, onDecrement);
    sectionRef.addEventListener(myCounterEventIncrement, onIncrement);
  });

  onCleanup(() => {
    sectionRef.removeEventListener(myCounterEventDecrement, onDecrement);
    sectionRef.removeEventListener(myCounterEventIncrement, onIncrement);
  });

  return (
    <section
      class="mx-4 mt-5 flex flex-col space-y-3 rounded-md border-2 border-secondary p-5 md:mx-0"
      ref={(ref) => {
        sectionRef = ref;
      }}
    >
      <h1 class="mb-2.5 text-xl font-medium sm:text-2xl">Web Components</h1>

      <button class="btn btn-secondary btn-xs" onClick={handleClickTambah}>
        Tambah
      </button>

      <my-counter attr:initial-count={initialCount()} />
    </section>
  );
};

export default WebComponents;
