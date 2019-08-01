export const TOKEN_KEY = "@user-token";
export const USER_ID = "@user-id";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUserId = () => localStorage.getItem(USER_ID);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const saveUserId = userId => {
  localStorage.setItem(USER_ID, userId);
}

export const removeUserId = () => {
  localStorage.removeItem(USER_ID);
}