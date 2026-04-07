import { defineStore } from 'pinia';
import { expenseApi } from '../apis/expense-api.js';
import { createMessageHelpers } from '../utils/element-plus-utils.js';

const message = createMessageHelpers();

export const useExpenseStore = defineStore('expense', {
    state: () => ({
        expenses: [],
        loading: false,
        error: null,
    }),

    getters: {},

    actions: {
        async fetchExpenses() {
            this.loading = true;
            this.error = null;
            try {
                const response = await expenseApi.getExpenses();
                console.log(response, "responseofexpenses");
                if (response && response.status === 200) {
                    this.expenses = response.data.expenses;
                }
            } catch (error) {
                this.error = error;
                message.error(error?.response?.data?.message || 'Failed to load expenses');
            } finally {
                this.loading = false;
            }
        },
    },
});

