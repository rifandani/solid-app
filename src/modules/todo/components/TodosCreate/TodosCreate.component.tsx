import { Component } from 'solid-js';
import useTodosCreate from './useTodosCreate.hook';

const TodosCreate: Component = () => {
  const { t, form, isSubmitting } = useTodosCreate();

  return (
    <form
      use:form
      aria-label="form-add"
      class="form-control mb-3 w-full duration-300 lg:flex-row"
    >
      <input
        aria-label="textbox-add"
        class="input input-bordered input-accent w-full text-accent-content lg:w-10/12"
        placeholder={t('todoPlaceholder')}
        name="todo"
        id="todo"
        type="text"
        required
      />

      <button
        aria-label="button-add"
        class="btn btn-accent ml-0 mt-2 w-full normal-case lg:ml-2 lg:mt-0 lg:w-2/12"
        type="submit"
        disabled={isSubmitting()}
      >
        {t('add', { icon: '✔' })}
      </button>
    </form>
  );
};

export default TodosCreate;
