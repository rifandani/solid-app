import { Component, Show } from 'solid-js';
import { Button } from '../../components/atoms';
import { usePostAddPageVM } from './PostAdd.vm';

const PostAddPage: Component = () => {
  const { postAddForm } = usePostAddPageVM();

  return (
    <main class="py-20 px-10 md:px-24 lg:px-40 xl:px-52 flex flex-col items-center justify-center">
      <h1 class="text-2xl font-semibold tracking-wider text-violet-500">
        Add Post
      </h1>

      <form
        class="flex flex-col gap-3 w-full"
        onSubmit={postAddForm.onSubmitForm}
      >
        <label for="title">Title</label>
        <input
          class="mt-1"
          placeholder="Title..."
          name="title"
          type="text"
          required
          autofocus
          onKeyUp={postAddForm.onKeyUpPostForm}
          value={postAddForm.postForm().title}
        />

        <label for="body">Body</label>
        <textarea
          class="mt-1"
          placeholder="Body..."
          name="body"
          rows={3}
          required
          onKeyUp={postAddForm.onKeyUpPostForm}
          value={postAddForm.postForm().body}
        />

        <Show when={!!postAddForm.postFormErrors()}>
          <div class="block pt-4">
            <h2 class="font-semibold p-2 border rounded border-red-500 text-red-500 bg-red-50">
              {postAddForm.postFormErrors()}
            </h2>
          </div>
        </Show>

        <Button.Solid class="my-5" type="submit">
          Submit
        </Button.Solid>
      </form>
    </main>
  );
};

export default PostAddPage;
