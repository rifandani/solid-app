import { Link } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import { Button, LoadingSpinner } from '../../components/atoms';
import { GetPostSuccessResponse } from '../../models/Post.model';
import usePostPageVM from './Post.vm';

const PostPage: Component = () => {
  const vm = usePostPageVM();

  return (
    <main class="flex flex-col justify-center py-20 px-10 md:px-24 lg:px-40 xl:px-52">
      <section class="flex w-full justify-between">
        <Link
          href="/posts"
          class="w-32 rounded border p-3 hover:border-violet-500 hover:italic hover:text-violet-500"
        >
          ⬅ Go Back
        </Link>

        <Button.Outlined
          size="sm"
          onClick={(e) => vm.onDeletePost(e)}
          disabled={vm.postDeleteMutation.isLoading}
        >
          {vm.postDeleteMutation.isLoading ? 'Deleting...' : 'Delete'}
        </Button.Outlined>
      </section>

      <Show when={vm.postDeleteMutation.isError}>
        <div class="flex w-full items-center justify-center py-5">
          <p>Delete error:</p>
          <pre>{JSON.stringify(vm.postDeleteMutation.error, null, 2)}</pre>
        </div>
      </Show>

      <Show when={vm.postQuery.isError}>
        <div class="flex w-full flex-col items-center justify-center py-5">
          <p>Query error:</p>
          <pre>{JSON.stringify(vm.postQuery.error, null, 2)}</pre>
        </div>
      </Show>

      <Show when={vm.postQuery.isLoading}>
        <div class="flex items-center justify-center py-5">
          <LoadingSpinner />
        </div>
      </Show>

      <Show when={vm.postQuery.isSuccess}>
        <h1 class="mb-10 text-center text-2xl font-semibold tracking-wider text-violet-500">
          Post Detail
        </h1>

        <section class="w-full">
          <h3 class="text-lg font-semibold">
            {(vm.postQuery.data as GetPostSuccessResponse).post.title}
          </h3>
          <h6 class="text-slate-700">{(vm.postQuery.data as GetPostSuccessResponse).post.body}</h6>
        </section>
      </Show>
    </main>
  );
};

export default PostPage;
