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

        <Button.Outlined size="sm" onClick={() => void vm.onDeletePost()}>
          Delete Post
        </Button.Outlined>
      </section>

      <Show when={!!vm.error()}>
        <div class="w-full flex py-5 justify-center items-center">
          <p>Delete error: {vm.error()}</p>
        </div>
      </Show>

      <Show when={vm.post.loading}>
        <div class="w-full flex py-5 justify-center items-center">
          <p>Loading post data...</p>
        </div>
      </Show>

      <Show
        when={vm.post.state === 'ready'}
        fallback={
          <div class="flex py-5 justify-center items-center">
            <LoadingSpinner />
          </div>
        }
      >
        <h1 class="text-2xl mb-10 font-semibold tracking-wider text-center text-violet-500">
          Post Detail
        </h1>

        <section class="w-full">
          <h3 class="font-semibold text-lg">{(vm.post() as GetPostSuccessResponse).post.title}</h3>
          <h6 class="text-slate-700">{(vm.post() as GetPostSuccessResponse).post.body}</h6>
        </section>
      </Show>
    </main>
  );
};

export default PostPage;
