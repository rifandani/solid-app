import { useNavigate } from '@solidjs/router';
import { createResource } from 'solid-js';
import { appStore } from '../../app/AppStore';
import { PostExpandUser } from '../../models/Post.model';
import { User } from '../../models/User.model';
import { axiosInstance } from '../../services/http';

const usePostsResource = () => {
  const postsResource = createResource<PostExpandUser[], User>(
    appStore.user,
    (_user) =>
      axiosInstance
        .get('posts', { params: { userId: _user.id, _expand: 'user' } })
        .then((res) => res.data),
  );

  return postsResource;
};

export const usePostsPageVM = () => {
  const navigate = useNavigate();
  const onNavigateToPostAdd = () => {
    navigate('add');
  };

  const [posts] = usePostsResource();

  return { onNavigateToPostAdd, posts };
};
