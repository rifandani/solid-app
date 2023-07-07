import { http } from '../../shared/services/api/http.api';
import { loginApiResponseSchema, type LoginSchema } from './auth.schema';

export const login = async (creds: LoginSchema) => {
  const resp = await http.post(`auth/login`, creds);

  // `parse` will throw if `resp.data` is not correct
  const loginApiResponse = loginApiResponseSchema.parse(resp.data);
  // set 'Authorization' headers to
  http.defaults.auth = `Bearer ${loginApiResponse.token}`;

  return loginApiResponse;
};
