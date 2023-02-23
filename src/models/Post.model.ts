import { ApiResponse, ApiSuccessResponse } from '../constants/types.constant';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// #region API
export type GetPostsResponse = ApiResponse<{ posts: Post[] }>;
export type GetPostsSuccessResponse = ApiSuccessResponse<{ posts: Post[] }>;
export type GetPostResponse = ApiResponse<{ post: Post }>;
export type GetPostSuccessResponse = ApiSuccessResponse<{ post: Post }>;
// #endregion
