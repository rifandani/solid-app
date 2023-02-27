import { createQueryKeys } from '@lukemorales/query-key-factory';
import { apiResponseUnionSchema } from '../../models/Api.model';
import { Post, postApiResponseSchema, postsApiResponseSchema } from '../../models/Post.model';
import { http } from './http';

// #region query functions
export const fetchPostsList = async () => {
  const resp = await http.get('posts');

  // return resp.data as GetPostsResponse
  return postsApiResponseSchema.parse(resp.data);
};

export const fetchPostDetailById = async (id: Post['id']) => {
  const resp = await http.get(`posts/${id}`);

  // return res.data as GetPostResponse;
  return postApiResponseSchema.parse(resp.data);
};

export const addPost = async (post: Pick<Post, 'title' | 'body'>) => {
  const resp = await http.post(`posts`, post);

  return postApiResponseSchema.parse(resp.data);
};

export const deletePostById = async (id: Post['id']) => {
  const resp = await http.delete(`posts/${id}`);

  return apiResponseUnionSchema.parse(resp.data);
};
// #endregion

// query keys factory
export const postsKeys = createQueryKeys('posts', {
  list: null,
  detailById: (id: number) => ({
    queryKey: [id],
    queryFn: () => fetchPostDetailById(id),
  }),
});
