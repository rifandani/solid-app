import { Component, Show } from 'solid-js';
import usePostAddPageVM from './PostAdd.vm';

const PostAddPage: Component = () => {
  const vm = usePostAddPageVM();

  return (
    <main class="flex flex-col items-center justify-center py-20 px-10 md:px-24 lg:px-40 xl:px-52">
      <h1 class="mb-5 text-2xl font-semibold tracking-wider text-primary-content">Add Post ⚡</h1>

      <form
        class="form-control flex w-full flex-col space-y-3"
        onSubmit={(ev) => void vm.postAddForm.onSubmitForm(ev)}
      >
        <label class="label" for="title">
          <span class="label-text text-primary-content">Title</span>
        </label>
        <input
          class="input-bordered input-accent input text-accent-content"
          placeholder="Title..."
          name="title"
          type="text"
          required
          autofocus
          onKeyUp={vm.postAddForm.onKeyUpPostForm}
          value={vm.postAddForm.postForm().title}
        />

        <label class="label" for="body">
          <span class="label-text text-primary-content">Body</span>
        </label>
        <textarea
          class="textarea-bordered textarea-accent textarea text-accent-content"
          placeholder="Body..."
          name="body"
          rows={3}
          required
          onKeyUp={vm.postAddForm.onKeyUpPostForm}
          value={vm.postAddForm.postForm().body}
        />

        <Show when={vm.postAddForm.postAddMutation.isError}>
          <div class="alert alert-error mt-2 shadow-lg">
            <div class="flex items-center">
              <span>❌ Add post error: </span>
              <pre>{JSON.stringify(vm.postAddForm.postAddMutation.error, null, 2)}</pre>
            </div>
          </div>
        </Show>

        <button
          class="btn-accent btn !mt-5 normal-case"
          type="submit"
          disabled={vm.postAddForm.postAddMutation.isLoading}
        >
          {vm.postAddForm.postAddMutation.isLoading ? 'Submitting...' : 'Submit 🎉'}
        </button>
      </form>
    </main>
  );
};

export default PostAddPage;
