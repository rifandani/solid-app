import { ErrorApiResponseSchema } from '@shared/api/api.schema';
import { http } from '@shared/services/api/http.api';
import { LoginApiResponseSchema, LoginSchema, loginApiResponseSchema } from './auth.schema';

export const authApi = {
  login: async (creds: LoginSchema) => {
    const resp = await http.post<LoginApiResponseSchema | ErrorApiResponseSchema>(
      `auth/login`,
      creds,
    );

    // `parse` will throw if `resp.data` is not correct
    const loginApiResponse = loginApiResponseSchema.parse(resp.data);
    // set 'Authorization' headers to
    http.defaults.headers.common.Authorization = `Bearer ${loginApiResponse.token}`;

    return loginApiResponse;
  },
} as const;
