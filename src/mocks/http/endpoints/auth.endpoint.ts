import { getBaseUrl } from '@mocks/util.mock';
import { RestHandler, rest } from 'msw';

export const authHandlers: RestHandler[] = [
  rest.post(getBaseUrl('auth/login'), async (req, res, ctx) => {
    const { email, password } = await req.json<{
      email: string;
      password: string;
    }>();

    if (email === 'email@email.com' && password === 'password') {
      return res(
        ctx.json({
          ok: true,
          login: {
            token: 'token',
          },
        }),
      );
    }

    return res(
      ctx.status(401),
      ctx.json({ ok: false, error: { code: 'auth/invalid-credentials' } }),
    );
  }),

  rest.post(getBaseUrl('auth/refresh-token'), (_req, res, ctx) =>
    res(
      ctx.json({
        ok: true,
        login: {
          token: 'refreshed-token',
        },
      }),
    ),
  ),
];
