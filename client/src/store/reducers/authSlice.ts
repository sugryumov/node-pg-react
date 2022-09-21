import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/models/IUser';

const initialState: { isAuth: boolean; profile: IUser } = {
  isAuth: Boolean(localStorage.getItem('token')),
  profile: {
    id: null,
    email: null,
    isActivated: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      localStorage.setItem('token', payload.accessToken);
      state.isAuth = true;
      state.profile = payload.user;
    },

    logout: state => {
      state.isAuth = Boolean(localStorage.removeItem('token'));
      state.profile = initialState.profile;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
