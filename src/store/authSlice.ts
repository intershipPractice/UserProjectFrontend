import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  useremail: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  useremail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.useremail = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.useremail = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;