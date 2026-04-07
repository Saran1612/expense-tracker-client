export const isAuthenticated = () => {
  const accessToken = localStorage.getItem('token');

  return !!(accessToken);
};

export const getAuthTokens = () => ({
  accessToken: localStorage.getItem('token'),
});

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const setAuthTokens = (accessToken) => {
  localStorage.setItem('token', accessToken);
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
};

export const setUser = (user) => {
  console.log(user, "useruser")
  localStorage.setItem('user', JSON.stringify(user));
};