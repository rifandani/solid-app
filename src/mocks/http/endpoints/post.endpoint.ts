// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { Post } from '../../../models/Post.model';
import { getBaseUrl } from '../../util.mock';
import { mockPost } from '../entities.http';

// mock 10 Post entity
let posts = Array.from({ length: 10 }, (_, idx) =>
  mockPost({
    id: idx + 1,
    userId: idx + 1,
    title: `Post title ${idx + 1}`,
    body: `Post body ${idx + 1}`,
  }),
);

export const postHandlers = [
  rest.get(getBaseUrl('posts'), async (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({ ok: true, posts })),
  ),
  rest.get(getBaseUrl('posts/:id'), async (req, res, ctx) => {
    const { id } = req.params;
    const paramsPostId = parseInt(id as string, 10);

    if (paramsPostId === 500) {
      return res(ctx.status(500));
    }

    const post = posts.find((_post) => _post.id === paramsPostId);

    if (post) {
      return res(
        ctx.status(200),
        ctx.json({
          ok: true,
          post,
        }),
      );
    }

    return res(
      ctx.status(404),
      ctx.json({
        ok: false,
        error: { code: `there is no post with id: ${id as string}` },
      }),
    );
  }),
  rest.post(getBaseUrl('posts'), async (req, res, ctx) => {
    const { title, body } = await req.json<{ title: string; body: string }>();
    const postId = posts.at(-1)?.id;

    if (postId) {
      const newPost: Post = {
        title,
        body,
        id: postId + 1,
        userId: postId + 1,
      };

      posts = [...posts, newPost];

      return res(
        ctx.status(201),
        ctx.json({
          ok: true,
          post: newPost,
        }),
      );
    }

    return res(
      ctx.status(500),
      ctx.json({
        ok: false,
        error: { code: `ooppss, unknown error occurred` },
      }),
    );
  }),
  rest.patch(getBaseUrl('posts/:id'), async (req, res, ctx) => {
    const { title, body } = await req.json<{ title: string; body: string }>();
    const { id } = req.params;
    const paramsPostId = parseInt(id as string, 10);

    const post = posts.find((_post) => _post.id === paramsPostId);

    if (post) {
      posts = posts.map((_post) =>
        _post.id === post.id ? { ..._post, title, body } : _post,
      );

      return res(
        ctx.status(201),
        ctx.json({
          ok: true,
          post,
        }),
      );
    }

    return res(
      ctx.status(404),
      ctx.json({
        ok: false,
        error: { code: `there is no post with id: ${id as string}` },
      }),
    );
  }),
  rest.delete(getBaseUrl('posts/:id'), async (req, res, ctx) => {
    const { id } = req.params;
    const paramsPostId = parseInt(id as string, 10);

    const post = posts.find((_post) => _post.id === paramsPostId);

    if (post) {
      posts = posts.filter((_post) => _post.id !== post.id);

      return res(
        ctx.status(200),
        ctx.json({
          ok: true,
        }),
      );
    }

    return res(
      ctx.status(404),
      ctx.json({
        ok: false,
        error: { code: `there is no post with id: ${id as string}` },
      }),
    );
  }),
];

export default { postHandlers };
