import { Component, For, Match, Switch } from 'solid-js';
import { Button, LoadingSpinner } from '../../components/atoms';
import { PostItem } from '../../components/molecules';
import { GetPostsSuccessResponse } from '../../models/Post.model';
import usePostsPageVM from './Posts.vm';

const PostsPage: Component = () => {
  const vm = usePostsPageVM();

  return (
    <main class="flex flex-col items-center justify-center py-20 px-10 md:px-24 lg:px-40 xl:px-52">
      <h1 class="text-2xl font-semibold tracking-wider text-violet-500">Post List</h1>

      <Button.Solid class="my-5" onClick={() => vm.onNavigateToPostAdd()}>
        Add Post
      </Button.Solid>

      <section class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Switch>
          <Match when={vm.postsQuery.isLoading}>
            <div class="flex w-full items-center justify-center py-5">
              <LoadingSpinner />
            </div>
          </Match>

          <Match when={vm.postsQuery.isError}>
            <div class="flex w-full items-center justify-center py-5">
              <p>Error posts</p>
            </div>
          </Match>

          <Match when={vm.postsQuery.isSuccess}>
            <For
              each={(vm.postsQuery.data as GetPostsSuccessResponse).posts}
              fallback={<div class="flex w-full items-center justify-center py-5">No Data</div>}
            >
              {(post) => <PostItem post={post} />}
            </For>
          </Match>
        </Switch>
      </section>
    </main>
  );
};

export default PostsPage;
