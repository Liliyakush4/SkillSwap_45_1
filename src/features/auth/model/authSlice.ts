// features/auth/model/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  currentUserId: string | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  currentUserId: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ userId: string }>) {
      state.isAuthenticated = true;
      state.currentUserId = action.payload.userId;
      state.status = 'success';
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.currentUserId = null;
      state.status = 'idle';
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
