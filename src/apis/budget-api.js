import { axiosInstance, handleAxiosError } from '../utils/axios.utils';
const axios = axiosInstance();

const getBudgets = async () => {
  try {
    const response = await axios.get('/budget/');
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

const createBudget = async (budgetData) => {
  try {
    const response = await axios.post('/budget/', budgetData);
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

const deleteBudget = async (budgetId) => {
  try {
    const response = await axios.delete(`/budget/${budgetId}`);
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const budgetApi = {
  getBudgets,
  createBudget,
  deleteBudget,
};

