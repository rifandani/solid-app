import {
  Login,
  loginApiResponseSchema,
  refreshTokenApiResponseSchema,
} from '../../models/Auth.model';
import { http } from './http';

// #region query functions
export const login = async (creds: Login) => {
  const resp = await http.post(`auth/login`, creds);

  return loginApiResponseSchema.parse(resp.data);
};

export const refreshToken = async () => {
  const resp = await http.post(`auth/refresh-token`);

  return refreshTokenApiResponseSchema.parse(resp.data);
};
// #endregion
