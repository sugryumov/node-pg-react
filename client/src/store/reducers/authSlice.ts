import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";

const initialState: { isAuth: boolean; profile: IUser } = {
  isAuth: false,
  profile: {
    id: null,
    email: null,
    isActivated: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      localStorage.setItem("token", payload.accessToken);
      state.isAuth = true;
      state.profile = payload.user;
    },

    logout: () => {
      localStorage.removeItem("token");

      return initialState;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
