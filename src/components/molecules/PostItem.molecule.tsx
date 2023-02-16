import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import { PostExpandUser } from '../../models/Post.model';

// #region INTERFACES
export interface PostItemProps {
  post: PostExpandUser;
}
// #endregion

const PostItem: Component<PostItemProps> = (props) => {
  return (
    <div class="flex flex-col gap-2 items-center justify-center border rounded p-5 shadow-md border-slate-300">
      <h3 class="text-center font-semibold text-lg">{props.post.title}</h3>
      <p class="text-center italic text-slate-500">
        created by: {props.post.user.name}
      </p>

      <h6 class="text-center mt-3 mb-2 line-clamp-3 text-slate-700">
        {props.post.body}
      </h6>
      <Link
        href={String(props.post.id)}
        class="border rounded p-3 hover:italic hover:text-violet-500 hover:border-violet-500"
      >
        See More ➡
      </Link>
    </div>
  );
};

export default PostItem;
