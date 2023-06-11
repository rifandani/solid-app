import { useNavigate } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { useI18n } from '../../../shared/hooks/usei18n/usei18n.hook';
import { queryKeys } from '../../../shared/services/api';
import { fetchPostsList } from '../../../shared/services/api/posts';

const usePostsResource = () => {
  const postsQuery = createQuery({
    queryKey: () => queryKeys.posts.list.queryKey,
    queryFn: () => fetchPostsList(),
  });

  return postsQuery;
};

const usePostsPageVM = () => {
  const [t] = useI18n();
  const navigate = useNavigate();

  const postsQuery = usePostsResource();

  const onNavigateToPostAdd = () => {
    navigate('add');
  };

  return { t, postsQuery, onNavigateToPostAdd };
};

export default usePostsPageVM;
