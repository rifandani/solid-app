import { useNavigate } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { useAppContext } from '../../app/Store.app';
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
  const [, storeAction] = useAppContext();
  const navigate = useNavigate();

  const postsQuery = usePostsResource();

  const onNavigateToPostAdd = () => {
    navigate('add');
  };

  return { storeAction, postsQuery, onNavigateToPostAdd };
};

export default usePostsPageVM;
