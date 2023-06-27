import { Component, For } from 'solid-js';
import { limits } from '../../constants/todos.constant';
import useTodosFilter from './useTodosFilter.hook';

const TodosFilter: Component = () => {
  const { t, selectedOption, handleChangeLimit } = useTodosFilter();

  return (
    <form
      data-testid="form"
      class="mb-3 flex w-full flex-col duration-300 md:flex-row md:space-x-2"
    >
      <label data-testid="label-limit" for="limit" class="label">
        <span class="label-text text-primary-content">{t('limit')}</span>
      </label>

      <select
        data-testid="select-limit"
        class="select-bordered select-primary select"
        name="limit"
        id="limit"
        value={selectedOption()}
        onChange={handleChangeLimit}
      >
        <For
          each={limits}
          fallback={<div class="flex w-full items-center justify-center py-5">{t('empty')}</div>}
        >
          {(limit) => (
            <option
              data-testid={`option-limit-${limit}`}
              value={limit}
              selected={limit === selectedOption()}
            >
              {limit}
            </option>
          )}
        </For>
      </select>
    </form>
  );
};

export default TodosFilter;
