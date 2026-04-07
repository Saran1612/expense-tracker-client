/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getAuthTokens, clearLocalStorage } from './auth.utils';
import { createMessageHelpers } from './element-plus-utils.js';
const message = createMessageHelpers();
// import jwtToken from '../config/jwtToken';

export const axiosInstance = () => {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  const axiosInstances = axios.create({
    baseURL,
    timeout: 18000000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const includeAuthRoutes = [
    '/auth/login',
    '/auth/register',
  ];

  axiosInstances.interceptors.request.use(
    (config) => {
      const shouldIncludeToken = includeAuthRoutes.some((route) => config.url === route);

      if (!shouldIncludeToken) {
        const customToken = localStorage.getItem('token');
        if (customToken) {
          config.headers.Authorization = `Bearer ${customToken}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosInstances.interceptors.response.use(
    (response) => response,
    (error) => {
      const { accessToken } = getAuthTokens();
      // Only force-redirect on 401 if user was previously authenticated (has a token)
      // Don't redirect on login/register failures
      const isAuthRoute = includeAuthRoutes.some((route) => error.config?.url === route);
      if ((error.response?.status === 401 && !isAuthRoute) || (!accessToken && !isAuthRoute)) {
        message.error('Session expired. Please log in again.');
        clearLocalStorage();
        // Use replace to avoid adding to history stack — no full page reload
        window.location.replace('/login');
      }
      return Promise.reject(error);
    },
  );

  return axiosInstances;
};

export function handleAxiosError(error) {
  const errorMessage = error?.response?.data?.message || error?.message || 'An error occurred';
  // Throw so that calling code's catch blocks receive the error properly
  throw new Error(errorMessage);
}
