import { Component, Show } from 'solid-js';
import { Button } from '../../components/atoms';
import usePostAddPageVM from './PostAdd.vm';

const PostAddPage: Component = () => {
  const vm = usePostAddPageVM();

  return (
    <main class="flex flex-col items-center justify-center py-20 px-10 md:px-24 lg:px-40 xl:px-52">
      <h1 class="text-2xl font-semibold tracking-wider text-violet-500">Add Post</h1>

      <form
        class="flex w-full flex-col gap-3"
        onSubmit={(ev) => void vm.postAddForm.onSubmitForm(ev)}
      >
        <label for="title">Title</label>
        <input
          class="mt-1"
          placeholder="Title..."
          name="title"
          type="text"
          required
          autofocus
          onKeyUp={vm.postAddForm.onKeyUpPostForm}
          value={vm.postAddForm.postForm().title}
        />

        <label for="body">Body</label>
        <textarea
          class="mt-1"
          placeholder="Body..."
          name="body"
          rows={3}
          required
          onKeyUp={vm.postAddForm.onKeyUpPostForm}
          value={vm.postAddForm.postForm().body}
        />

        <Show when={vm.postAddForm.postAddMutation.isError}>
          <div class="block pt-4">
            <h2 class="rounded border border-red-500 bg-red-50 p-2 font-semibold text-red-500">
              {String(vm.postAddForm.postAddMutation.error)}
            </h2>
          </div>
        </Show>

        <Button.Solid
          class="my-5"
          type="submit"
          disabled={vm.postAddForm.postAddMutation.isLoading}
        >
          {vm.postAddForm.postAddMutation.isLoading ? 'Submitting...' : 'Submit'}
        </Button.Solid>
      </form>
    </main>
  );
};

export default PostAddPage;
