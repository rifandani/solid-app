import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import { Post } from '../../models/Post.model';

// #region INTERFACES
export interface PostItemProps {
  post: Post;
}
// #endregion

const PostItem: Component<PostItemProps> = (props) => (
  <div class="card bg-secondary text-secondary-content border shadow-xl">
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
