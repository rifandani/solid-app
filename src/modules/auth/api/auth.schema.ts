import { z } from 'zod';
import { apiResponseSchema } from '../../shared/api/api.schema';

// #region schemas
export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

export const tokenSchema = z.object({
  login: z.object({
    token: z.string(),
  }),
});

export const loginApiResponseSchema = apiResponseSchema(tokenSchema);
export const refreshTokenApiResponseSchema = apiResponseSchema(tokenSchema);
// #endregion

// #region types
export type Login = z.infer<typeof loginSchema>;
export type LoginApiResponse = z.infer<typeof loginApiResponseSchema>;

export type Token = z.infer<typeof tokenSchema>;
export type RefreshTokenApiResponse = z.infer<typeof refreshTokenApiResponseSchema>;
// #endregion
