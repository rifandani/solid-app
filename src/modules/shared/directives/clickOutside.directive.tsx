import { Accessor, onCleanup } from 'solid-js';

export type ClickOutsideDirectiveParams = () => unknown;

/**
 * a callback function will be fired whenever the user clicks outside of the dom node the action is applied to.
 *
 * @example
 *
 * ```tsx
 * <script>
 *   import { clickOutside } from '../useClickOutside.directive'
 *
 *   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
 *   clickOutside;
 *
 *   const [show, setShow] = createSignal(false);
 * </script>
 *
 * <Show
 *   when={show()}
 *   fallback={
 *     <button class="btn-sm btn" onClick={() => setShow(true)}>
 *       Open Modal
 *     </button>
 *   }
 * >
 *   <div class="card w-96 bg-base-100 shadow-xl" use:clickOutside={() => setShow(false)}>
 *     Modal Showed!
 *   </div>
 * </Show>
 * ```
 */
const clickOutside = (node: HTMLElement, params: Accessor<ClickOutsideDirectiveParams>): void => {
  const callback = params();

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (!node.contains(target as Node)) callback();
  };

  document.body.addEventListener('click', handleClickOutside);

  onCleanup(() => document.body.removeEventListener('click', handleClickOutside));
};

export default clickOutside;
