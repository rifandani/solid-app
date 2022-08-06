import { useParams } from '@solidjs/router';
import { createResource } from 'solid-js';
import { PostEmbedComments } from '../../models/Post.model';
import { axiosInstance } from '../../services/http';

export const usePostVM = () => {
  const params = useParams();

  const [post, { refetch: refetchPost }] = createResource<
    PostEmbedComments,
    string
  >(params.id, (postId) =>
    axiosInstance
      .get(`posts/${postId}`, {
        params: { _embed: 'comments' },
      })
      .then((res) => res.data),
  );

  return { post };
};
