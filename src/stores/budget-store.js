import { defineStore } from 'pinia';
import { budgetApi } from '../apis/budget-api.js';
import { createMessageHelpers } from '../utils/element-plus-utils.js';

const message = createMessageHelpers();

export const useBudgetStore = defineStore('budget', {
    state: () => ({
        budgets: [],
        loading: false,
        error: null,
    }),

    getters: {},

    actions: {
        async fetchBudgets() {
            this.loading = true;
            this.error = null;
            try {
                const response = await budgetApi.getBudgets();
                console.log(response, "responseofbudgets");
                if (response && response.status === 200) {
                    this.budgets = response.data.budgets || [];
                }
            } catch (error) {
                this.error = error;
                message.error(error?.response?.data?.message || 'Failed to load budgets');
            } finally {
                this.loading = false;
            }
        },
    },
});

