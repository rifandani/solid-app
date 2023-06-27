import { shuffle } from '@rifandani/nxact-yutiriti';
import { Component, For, Show } from 'solid-js';
import useHomeClock from './useHomeClock.hook';

const HomeClock: Component = () => {
  const vm = useHomeClock();

  return (
    <>
      <Show when={vm.toggle()}>
        <div class="stats mt-8 shadow">
          <div class="stat">
            <div class="stat-title">{vm.t('clock')}:</div>
            <div class="stat-value">
              {vm.hours()} : {vm.minutes()} : {vm.seconds()}{' '}
            </div>
            <div class="stat-desc">{vm.t('clickToggleClock')}</div>
          </div>
        </div>
      </Show>

      <div
        ref={(elem) => vm.setParent(elem)}
        class="mt-8 grid grid-cols-1 gap-2 duration-300 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <For each={vm.buttons()}>
          {(value) => (
            <button
              class={value.class}
              onClick={
                value.id === 'sort' ? () => vm.setButtons((prev) => shuffle(prev)) : value.onClick
              }
            >
              {value.text}
            </button>
          )}
        </For>
      </div>
    </>
  );
};

export default HomeClock;
