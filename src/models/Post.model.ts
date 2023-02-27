import { z } from 'zod';
import { ApiResponse, ApiSuccessResponse } from '../constants/types.constant';
import { apiResponseSchema, apiSuccessSchema } from './Api.model';

// #region schemas
export const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const postsApiSuccessResponseSchema = apiSuccessSchema({
  posts: z.array(postSchema),
});
export const postsApiResponseSchema = apiResponseSchema(
  z.object({
    posts: z.array(postSchema),
  }),
);

export const postApiSuccessResponseSchema = apiSuccessSchema({
  post: postSchema,
});
export const postApiResponseSchema = apiResponseSchema(
  z.object({
    post: postSchema,
  }),
);
// #endregion

// #region types
export type Post = z.infer<typeof postSchema>;
export type GetPostsResponse = ApiResponse<{ posts: Post[] }>;
export type GetPostsSuccessResponse = ApiSuccessResponse<{ posts: Post[] }>;
export type GetPostResponse = ApiResponse<{ post: Post }>;
export type GetPostSuccessResponse = ApiSuccessResponse<{ post: Post }>;
// #endregion
