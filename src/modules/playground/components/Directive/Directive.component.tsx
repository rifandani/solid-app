import clickOutside from '@shared/directives/clickOutside.directive';
import { Component, Show, createSignal } from 'solid-js';

const Directive: Component = () => {
  const [show, setShow] = createSignal(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  clickOutside;

  return (
    <section class="mt-5 rounded-md border-2 border-secondary p-5 md:mx-0">
      <h1 class="mb-2.5 text-xl font-medium sm:text-2xl">Directive</h1>

      <Show
        when={show()}
        fallback={
          <button class="btn btn-sm" onClick={() => setShow(true)}>
            Open Modal
          </button>
        }
      >
        <div class="card w-96 bg-base-200 shadow-xl" use:clickOutside={() => setShow(false)}>
          <div class="card-body">
            <h2 class="card-title">Modal Showed!</h2>
          </div>
        </div>
      </Show>
    </section>
  );
};

export default Directive;
