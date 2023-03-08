import { env } from '../configs/env/env.config';

// make sure this URL is the same like VITE_API_BASE_URL in the .env.development
export const getBaseUrl = (path: string) => env.apiBaseUrl + path;

export default { getBaseUrl };