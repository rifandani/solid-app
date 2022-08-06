import { createResource } from 'solid-js';
import { appStore } from '../../app/AppStore';
import { PostExpandUser } from '../../models/Post.model';
import { User } from '../../models/User.model';
import { axiosInstance } from '../../services/http';

export const [posts, { refetch: refetchPosts }] = createResource<
  PostExpandUser[],
  User
>(
  appStore.user,
  (_user) =>
    axiosInstance
      .get('posts', { params: { userId: _user.id, _expand: 'user' } })
      .then((res) => res.data),
  { initialValue: [] },
);
