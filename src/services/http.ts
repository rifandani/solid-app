import axios from 'axios';
import { env } from '../configs/env/env.config';

// Set config defaults when creating the instance
export const http = axios.create({
  baseURL: env.apiBaseUrl,
  validateStatus: (status) =>
    // Resolve only if the status code is less than 500
    status < 500,
});

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default { http };
