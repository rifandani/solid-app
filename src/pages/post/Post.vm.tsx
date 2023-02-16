import { useNavigate, useRouteData } from '@solidjs/router';
import { Resource } from 'solid-js';
import { PostEmbedComments } from '../../models/Post.model';
import { axiosInstance } from '../../services/http';

export const usePostPageVM = () => {
  const post = useRouteData() as unknown as Resource<PostEmbedComments>;
  const navigate = useNavigate();

  const onDeletePost = async () => {
    // delete post
    const resp = await axiosInstance.delete(`/posts/${post()?.id}`);

    if (resp.status === 200) {
      // refetchPosts();
      navigate('/posts');
      return;
    }

    console.error('delete post error', resp.data);
  };

  return { post, onDeletePost };
};
