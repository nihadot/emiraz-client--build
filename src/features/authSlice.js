import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('usersData')) || null,
  isAuthenticated: Boolean(localStorage.getItem('access-token')),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem('usersData',JSON.stringify(action.payload.result))
      localStorage.setItem('access-token',JSON.stringify(action.payload.token))
      state.user = action.payload.result;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    logout: (state) => {
      localStorage.removeItem('usersData'),
      localStorage.removeItem('access-token'),
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
