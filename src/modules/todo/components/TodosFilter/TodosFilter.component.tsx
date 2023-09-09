import { limits } from '@todo/constants/todos.constant';
import { Component, For } from 'solid-js';
import useTodosFilter from './useTodosFilter.hook';

const TodosFilter: Component = () => {
  const { t, selectedOption, handleChangeLimit } = useTodosFilter();

  return (
    <form
      aria-label="form-filter"
      class="mb-3 flex w-full flex-col duration-300 md:flex-row md:space-x-2"
    >
      <label for="limit" class="label">
        <span class="label-text">{t('limit')}</span>
      </label>

      <select
        aria-label="combobox-filter"
        class="select select-bordered select-primary"
        name="limit"
        id="limit"
        value={selectedOption()}
        onChange={handleChangeLimit}
      >
        <For each={limits}>
          {(limit) => (
            <option data-testid={`option-limit-${limit}`} value={limit}>
              {limit}
            </option>
          )}
        </For>
      </select>
    </form>
  );
};

export default TodosFilter;
