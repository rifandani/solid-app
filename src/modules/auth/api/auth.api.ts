import { http } from '../../shared/services/http/http';
import { loginApiResponseSchema, type LoginSchema } from './auth.schema';

// #region query functions
export const login = async (creds: LoginSchema) => {
  const resp = await http.post(`auth/login`, creds);

  // `parse` will throw if `resp.data` is not correct
  const loginApiResponse = loginApiResponseSchema.parse(resp.data);
  // set 'Authorization' headers to
  http.defaults.headers.common.Authorization = `Bearer ${loginApiResponse.token}`;

  return loginApiResponse;
};

// export const refreshToken = async () => {
// const resp = await http.post(`auth/login`, creds);

// // `parse` will throw if `resp.data` is not correct
// const response = loginApiResponseSchema.safeParse(resp.data);

// if (response.success) {
//   // set 'Authorization' headers to
//   http.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`; //

//   return response.data;
// } else {
//   return resp.data as ErrorApiResponseSchema;
// }
// };
// #endregion
