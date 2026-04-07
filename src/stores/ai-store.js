import { defineStore } from 'pinia';

export const useAskAiStore = defineStore('askAi', {
    state: () => ({
        response: null,
        loading: false,
        error: null,
    }),

    getters: {},
})  