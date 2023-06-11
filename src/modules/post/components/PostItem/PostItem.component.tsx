import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import { Post } from '../../api/post.schema';

// #region INTERFACES
export interface PostItemProps {
  post: Post;
}
// #endregion

const PostItem: Component<PostItemProps> = (props) => (
  <div class="card border bg-secondary text-secondary-content shadow-xl">
    <div class="card-body">
      <h3 class="card-title">{props.post.title}</h3>

      <p class="line-clamp-3">{props.post.body}</p>

      <div class="card-actions mt-3">
        <Link href={String(props.post.id)} class="btn-accent btn normal-case">
          See More ➡
        </Link>
      </div>
    </div>
  </div>
);

export default PostItem;
