import axios from 'axios';

// Set config defaults when creating the instance
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5123',
});

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
