// import api from './base';
import { axiosInstance, handleAxiosError } from '../utils/axios.utils';
const axios = axiosInstance();


const Authlogin = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

const Authregister = async (userData) => {
  try {
    const response = await axios.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

const getUserInfo = async () => {
  try {
    const response = await axios.get('/auth/me');
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

const updateUser = async (userData) => {
  try {
    const response = await axios.put('/auth/update', userData);
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const authApi = {
  Authlogin,
  Authregister,
  getUserInfo,
  updateUser
}
