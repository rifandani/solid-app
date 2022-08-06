import { Link } from '@solidjs/router';
import { Component, For, Show } from 'solid-js';
import { LoadingSpinner } from '../../components/atoms';
import { usePostVM } from './Post.vm';

const PostPage: Component = () => {
  const { post } = usePostVM();

  return (
    <main class="py-20 px-10 md:px-24 lg:px-40 xl:px-52 flex flex-col justify-center">
      <Link
        href="/posts"
        class="w-32 border rounded p-3 hover:italic hover:text-violet-500 hover:border-violet-500"
      >
        ⬅ Go Back
      </Link>

      <Show
        when={post}
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
          <h3 class="font-semibold text-lg">{post()?.title}</h3>
          <h6 class="text-slate-700">{post()?.body}</h6>
        </section>

        <h2 class="text-2xl text-center my-10 font-semibold tracking-wider text-violet-500">
          Comments
        </h2>

        <section class="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* loop thru posts */}
          <For
            each={post()?.comments}
            fallback={
              <div class="flex py-5 justify-center items-center">No Data</div>
            }
          >
            {(comment) => (
              <div class="flex flex-col gap-2 p-3 border border-slate-300 shadow-md">
                <p class="font-semibold">{comment.name}</p>
                <p class="line-clamp-3">{comment.body}</p>
                <p class="text-slate-500 italic line-clamp-2">
                  {comment.email}
                </p>
              </div>
            )}
          </For>
        </section>
      </Show>
    </main>
  );
};

export default PostPage;
