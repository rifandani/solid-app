import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import { Post } from '../../models/Post.model';

// #region INTERFACES
export interface PostItemProps {
  post: Post;
}
// #endregion

const PostItem: Component<PostItemProps> = (props) => (
  <div class="flex flex-col items-center justify-center gap-2 rounded border border-slate-300 p-5 shadow-md">
    <h3 class="text-center text-lg font-semibold">{props.post.title}</h3>

    <h6 class="mt-3 mb-2 text-center text-slate-700 line-clamp-3">{props.post.body}</h6>

    <Link
      href={String(props.post.id)}
      class="rounded border p-3 hover:border-violet-500 hover:italic hover:text-violet-500"
    >
      See More ➡
    </Link>
  </div>
);

export default PostItem;
