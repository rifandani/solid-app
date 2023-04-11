import { Link } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import { LoadingSpinner } from '../../components/atoms';
import { GetPostSuccessResponse } from '../../models/Post.model';
import usePostPageVM from './Post.vm';

const PostPage: Component = () => {
  const vm = usePostPageVM();

  return (
    <main class="flex flex-col justify-center px-10 py-20 md:px-24 lg:px-40 xl:px-52">
      <section class="mb-10 flex w-full items-center justify-between">
        <Link href="/posts" class="btn-accent btn normal-case">
          ⬅ Go Back
        </Link>

        <h1 class="text-primary-content text-2xl font-semibold tracking-wider">Post Detail 🧻</h1>

        <button
          class="btn-accent btn normal-case"
          type="button"
          onClick={(e) => vm.onDeletePost(e)}
          disabled={vm.postDeleteMutation.isLoading}
        >
          {vm.postDeleteMutation.isLoading ? 'Deleting...' : 'Delete 💥'}
        </button>
      </section>

      <Show when={vm.postDeleteMutation.isError}>
        <div class="alert alert-error mt-2 shadow-lg">
          <div class="flex items-center">
            <span>❌ Mutation error: {(vm.postDeleteMutation.error as Error).message}</span>
          </div>
        </div>
      </Show>

      <Show when={vm.postQuery.isError}>
        <div class="alert alert-error mt-2 shadow-lg">
          <div class="flex items-center">
            <span>❌ Query error: {(vm.postQuery.error as Error).message}</span>
          </div>
        </div>
      </Show>

      <Show when={vm.postQuery.isLoading}>
        <div class="flex items-center justify-center py-5">
          <LoadingSpinner color="currentColor" />
        </div>
      </Show>

      <Show when={vm.postQuery.isSuccess}>
        <section class="text-primary-content flex w-full flex-col space-y-3">
          <h3 class="text-lg font-semibold">
            {(vm.postQuery.data as GetPostSuccessResponse).post.title}
          </h3>

          <p class="text-sm">{(vm.postQuery.data as GetPostSuccessResponse).post.body}</p>
        </section>
      </Show>
    </main>
  );
};

export default PostPage;
