import { Component, For, Show } from 'solid-js';
import useHomeClock from './useHomeClock.hook';

const HomeClock: Component = () => {
  const vm = useHomeClock();

  return (
    <>
      <Show when={vm.showClock()}>
        <div data-testid="home-clock-show" class="stats mt-8 bg-base-200 shadow">
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
        <For each={vm.buttons}>
          {(btn) => (
            <button
              data-testid={`home-clock-button-${btn.id}`}
              type="button"
              class={btn.class}
              onClick={() => vm.onClickMapper(btn.id)}
            >
              {vm.t(btn.text)}
            </button>
          )}
        </For>
      </div>
    </>
  );
};

export default HomeClock;
