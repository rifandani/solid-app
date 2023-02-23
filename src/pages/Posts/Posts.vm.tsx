import { useNavigate } from '@solidjs/router';
import { createResource } from 'solid-js';
import { GetPostsResponse } from '../../models/Post.model';
import { http } from '../../services/http';

const usePostsResource = () => {
  const postsResource = createResource(() =>
    http.get('posts').then((res) => res.data as GetPostsResponse),
  );

  return postsResource;
};

const usePostsPageVM = () => {
  const navigate = useNavigate();
  const onNavigateToPostAdd = () => {
    navigate('add');
  };

  const [posts] = usePostsResource();

  return { onNavigateToPostAdd, posts };
};

export default usePostsPageVM;
