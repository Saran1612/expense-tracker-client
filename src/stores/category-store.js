import { defineStore } from "pinia";
import { categoryApi } from "../apis/category-api.js";
import { createMessageHelpers } from "../utils/element-plus-utils.js";

const message = createMessageHelpers();

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
    loading: false,
    error: null,
  }),

  getters: {},

  actions: {
    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
        const response = await categoryApi.getCategories();
        if (response && response?.data?.categories) {
          console.log(response?.data?.categories, "categoriesresponseee");
          this.categories = response?.data?.categories || [];
        }
      } catch (error) {
        this.error = error;
        message.error("Failed to load categories");
      } finally {
        this.loading = false;
      }
    },
  },
});
