import { Link } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import { Button, LoadingSpinner } from '../../components/atoms';
import { GetPostSuccessResponse } from '../../models/Post.model';
import usePostPageVM from './Post.vm';

const PostPage: Component = () => {
  const vm = usePostPageVM();

  return (
    <main class="py-20 px-10 md:px-24 lg:px-40 xl:px-52 flex flex-col justify-center">
      <section class="w-full flex justify-between">
        <Link
          href="/posts"
          class="w-32 border rounded p-3 hover:italic hover:text-violet-500 hover:border-violet-500"
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
        <div class="w-full flex py-5 justify-center items-center">
          <p>Delete error:</p>
          <pre>{JSON.stringify(vm.postDeleteMutation.error, null, 2)}</pre>
        </div>
      </Show>

      <Show when={vm.postQuery.isError}>
        <div class="w-full flex flex-col py-5 justify-center items-center">
          <p>Query error:</p>
          <pre>{JSON.stringify(vm.postQuery.error, null, 2)}</pre>
        </div>
      </Show>

      <Show when={vm.postQuery.isLoading}>
        <div class="flex py-5 justify-center items-center">
          <LoadingSpinner />
        </div>
      </Show>

      <Show when={vm.postQuery.isSuccess}>
        <h1 class="text-2xl mb-10 font-semibold tracking-wider text-center text-violet-500">
          Post Detail
        </h1>

        <section class="w-full">
          <h3 class="font-semibold text-lg">
            {(vm.postQuery.data as GetPostSuccessResponse).post.title}
          </h3>
          <h6 class="text-slate-700">{(vm.postQuery.data as GetPostSuccessResponse).post.body}</h6>
        </section>
      </Show>
    </main>
  );
};

export default PostPage;
