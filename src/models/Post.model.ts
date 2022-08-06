import { Comment } from './Comment.model';
import { User } from './User.model';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostExpandUser {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
}

export interface PostEmbedComments {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: Comment[];
}
