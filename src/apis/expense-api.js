import { axiosInstance, handleAxiosError } from '../utils/axios.utils';
const axios = axiosInstance();

const getExpenses = async () => {
  try {
    const response = await axios.get('/expense/');
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

const createExpense = async (expenseData) => {
  try {
    const response = await axios.post('/expense', expenseData);
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

const updateExpense = async (expenseId, expenseData) => {
  try {
    const response = await axios.put(`/expense/${expenseId}`, expenseData);
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

const deleteExpense = async (expenseId) => {
  try {
    const response = await axios.delete(`/expense/${expenseId}`);
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const expenseApi = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};

