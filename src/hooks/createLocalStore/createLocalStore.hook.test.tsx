import { createEffect, createRoot } from 'solid-js';
import { createLocalStore } from './createLocalStore.hook';

describe('createLocalStore', () => {
  beforeEach(() => {
    localStorage.removeItem('todos');
  });

  const initialState = {
    todos: [],
    newTitle: '',
  };

  test('it reads pre-existing state from localStorage', () =>
    createRoot((dispose) => {
      // ARRANGE
      const savedState = { todos: [], newTitle: 'saved' };
      localStorage.setItem('todos', JSON.stringify(savedState));
      const [state] = createLocalStore('todos', initialState);

      // ASSERT
      expect(state).toEqual(savedState);

      // cleanup
      dispose();
    }));

  test('it stores new state to localStorage', () =>
    createRoot((dispose) => {
      // ARRANGE
      const [, setState] = createLocalStore('todos', initialState);
      setState('newTitle', 'updated');

      // to catch an effect, use an effect
      return new Promise<void>((resolve) =>
        // eslint-disable-next-line no-promise-executor-return
        createEffect(() => {
          // ASSERT
          expect(JSON.parse((localStorage.todos as string) || '')).toEqual({
            todos: [],
            newTitle: 'updated',
          });

          // cleanup
          dispose();
          resolve();
        }),
      );
    }));

  test('it updates state multiple times', async () => {
    // ARRANGE
    const { dispose, setState } = createRoot((_dispose) => {
      const [, SetState] = createLocalStore('todos', initialState);
      return { dispose: _dispose, setState: SetState };
    });
    setState('newTitle', 'first');

    // ACT -> wait a tick to resolve all effects
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((done) => setTimeout(done, 0));

    // ASSERT
    expect(JSON.parse((localStorage.todos as string) || '')).toEqual({
      todos: [],
      newTitle: 'first',
    });

    // ACT
    setState('newTitle', 'second');
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((done) => setTimeout(done, 0));

    // ASSERT
    expect(JSON.parse((localStorage.todos as string) || '')).toEqual({
      todos: [],
      newTitle: 'second',
    });

    // cleanup
    dispose();
  });
});
