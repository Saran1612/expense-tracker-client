import { axiosInstance, handleAxiosError } from '../utils/axios.utils';
const axios = axiosInstance();

const getDashboardData = async () => {
  try {
    const response = await axios.get('/dashboard');
    console.log(response, "responseofdashboard checking ");
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const dashboardApi = {
  getDashboardData,
};