import { Component, For, Show } from 'solid-js';
import { Button, LoadingSpinner } from '../../components/atoms';
import { PostItem } from '../../components/molecules';
import { usePostsPageVM } from './Posts.vm';

const PostsPage: Component = () => {
  const { onNavigateToPostAdd, posts } = usePostsPageVM();

  return (
    <main class="py-20 px-10 md:px-24 lg:px-40 xl:px-52 flex flex-col items-center justify-center">
      <h1 class="text-2xl font-semibold tracking-wider text-violet-500">
        Post List
      </h1>

      <Button.Solid class="my-5" onClick={onNavigateToPostAdd}>
        Add Post
      </Button.Solid>

      <section class="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* loop thru posts */}
        <Show when={posts.loading}>
          <div class="w-full flex py-5 justify-center items-center">
            <LoadingSpinner />
          </div>
        </Show>

        <For
          each={posts()}
          fallback={
            <div class="w-full flex py-5 justify-center items-center">
              No Data
            </div>
          }
        >
          {(post) => <PostItem post={post} />}
        </For>
      </section>
    </main>
  );
};

export default PostsPage;
