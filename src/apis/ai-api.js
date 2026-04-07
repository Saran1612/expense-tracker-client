import { axiosInstance, handleAxiosError } from '../utils/axios.utils';
const axios = axiosInstance();


const askAi = async (question) => {
  try {
    const response = await axios.post('/askai', { question });
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const askaiApi = {
  askAi,
}; 