import { defineStore } from 'pinia';
import { getAuthTokens, setAuthTokens, clearLocalStorage, setUser, getUser } from '../utils/auth.utils';

export const useAuthStore = defineStore('auth', {
  state: () => {
    const { accessToken } = getAuthTokens();
    const user = getUser();
    return {
      user: user,
      token: accessToken,
      loading: false,
      error: null,
    };
  },

  getters: {
    isAuthenticated: () => !!this.token,
    currentUser: (state) => state.user,
  },

  actions: {
    setCurrentUser(user) {
      this.user = user;
      setUser(user);
    },

    setToken(token) {
      this.token = token;
      setAuthTokens(token);
    },

    clearAuth() {
      this.user = null;
      this.token = null;
      clearLocalStorage();
    },
    getCurrentUser() {
      const user = getUser();
      this.user = user;
      return this.user;
    },
    getToken() {
      const { accessToken } = getAuthTokens();
      this.token = accessToken;
      return this.token;
    },
  },
}); 