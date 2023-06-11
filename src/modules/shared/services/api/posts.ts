import { Post, postApiResponseSchema, postsApiResponseSchema } from '../../../post/api/post.schema';
import { apiResponseUnionSchema } from '../../api/api.schema';
import { http } from './http';

// #region query functions
export const fetchPostsList = async () => {
  const resp = await http.get('posts');

  // `parse` will throw if `resp.data` is not correct
  return postsApiResponseSchema.parse(resp.data);
};

export const fetchPostDetailById = async (id: Post['id']) => {
  const resp = await http.get(`posts/${id}`);

  // `parse` will throw if `resp.data` is not correct
  return postApiResponseSchema.parse(resp.data);
};

export const addPost = async (post: Pick<Post, 'title' | 'body'>) => {
  const resp = await http.post(`posts`, post);

  // `parse` will throw if `resp.data` is not correct
  return postApiResponseSchema.parse(resp.data);
};

export const deletePostById = async (id: Post['id']) => {
  const resp = await http.delete(`posts/${id}`);

  // `parse` will throw if `resp.data` is not correct
  return apiResponseUnionSchema.parse(resp.data);
};
// #endregion

// query keys factory
const postKeys = {
  all: ['todos'] as const, // ['todos']
  list: () => [...postKeys.all, 'list'] as const, // ['todos', 'list']
  listFilters: (filters: string) => [...postKeys.list(), { filters }] as const, // // ['todos', 'list', { filters }]
  detail: () => [...postKeys.all, 'detail'] as const, // ['todos', 'detail']
  detailById: (id: number) => [...postKeys.detail(), id] as const, // ['todos', 'detail', id]
} as const;
