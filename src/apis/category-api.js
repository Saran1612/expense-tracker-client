import { axiosInstance, handleAxiosError } from "../utils/axios.utils";
const axios = axiosInstance();

const createCategory = async (categoryData) => {
  try {
    const response = await axios.post("/category", categoryData);
    console.log(response, "responsecheckinggggg");
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

const getCategories = async () => {
  try {
    const response = await axios.get("/category");
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axios.put(`/category/${categoryId}`, categoryData);
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`/category/${categoryId}`);
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const categoryApi = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
