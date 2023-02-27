import { useNavigate } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { queryKeys } from '../../services/api';
import { fetchPostsList } from '../../services/api/posts';

const usePostsResource = () => {
  const postsQuery = createQuery({
    queryKey: () => queryKeys.posts.list.queryKey,
    queryFn: () => fetchPostsList(),
  });

  return postsQuery;
};

const usePostsPageVM = () => {
  const navigate = useNavigate();

  const postsQuery = usePostsResource();

  const onNavigateToPostAdd = () => {
    navigate('add');
  };

  return { onNavigateToPostAdd, postsQuery };
};

export default usePostsPageVM;
