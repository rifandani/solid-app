import { z } from 'zod';

// #region SCHEMAS
export const loginSchema = z.object({
  username: z.string().min(3, 'username must contain at least 3 characters'),
  password: z.string().min(6, 'password must contain at least 6 characters'),
  expiresInMins: z.number().optional(),
});

export const loginApiResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.union([z.literal('male'), z.literal('female')]),
  image: z.string().url(),
  token: z.string(),
});
// #endregion

export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginApiResponseSchema = z.infer<typeof loginApiResponseSchema>;
