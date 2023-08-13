import { Component } from 'solid-js';
import { useI18n } from '../../../shared/hooks/usei18n/usei18n.hook';
import TodosCreate from '../../components/TodosCreate/TodosCreate.component';
import TodosFilter from '../../components/TodosFilter/TodosFilter.component';
import TodosList from '../../components/TodosList/TodosList.component';

const TodosPage: Component = () => {
  const [t] = useI18n();

  return (
    <main class="flex flex-col items-center justify-center px-10 py-20 duration-300 md:px-24 lg:px-40 xl:px-52">
      <h1 class="mb-10 text-2xl font-semibold tracking-wider text-primary-content">
        {t('xList', { feature: 'Todo' })}
      </h1>

      <section class="card w-full rounded-lg border bg-secondary p-5 text-secondary-content shadow-lg">
        <TodosCreate />

        <TodosFilter />

        <TodosList />
      </section>
    </main>
  );
};

export default TodosPage;
