import { useNavigate, useRouteData } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { GetPostSuccessResponse } from '../../models/Post.model';
import { http } from '../../services/http';
import routeDataPost from './Post.data';

const usePostPageVM = () => {
  const navigate = useNavigate();
  const [post] = useRouteData<ReturnType<typeof routeDataPost>>();
  const [error, setError] = createSignal('');

  const onDeletePost = async () => {
    // delete post
    const resp = await http.delete(`/posts/${(post() as GetPostSuccessResponse).post.id ?? ''}`);

    if (resp.status !== 200) {
      setError('delete post error');
      return;
    }

    navigate('/posts');
  };

  return { post, error, onDeletePost };
};

export default usePostPageVM;
