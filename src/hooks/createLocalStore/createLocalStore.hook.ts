import { createEffect } from 'solid-js';
import { createStore, SetStoreFunction, Store } from 'solid-js/store';

/**
 * This creates a store that also integrated with local storage.
 *
 * @example
 *
 * ```ts
 * // don't pass second argument to get the already instantiated instance
 * const [store, setStore] = createLocalStore('user')
 *
 * // pass second argument to instantiates a new instance
 * const [store, setStore] = createLocalStore('user', { username: 'rifandani' })
 * ```
 */
export function createLocalStore<T extends object>(
  name: string,
  init: T,
): [Store<T>, SetStoreFunction<T>] {
  const localState = localStorage.getItem(name);
  const [store, setStore] = createStore<T>(localState ? (JSON.parse(localState) as T) : init);

  createEffect(() => localStorage.setItem(name, JSON.stringify(store)));

  return [store, setStore];
}

export type CreateLocalStore = ReturnType<typeof createLocalStore>;
