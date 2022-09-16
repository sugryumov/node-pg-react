import authReducer, { authActions } from "./authSlice";
import usersReducer, { usersActions } from "./usersSlice";

export const reducers = {
  authReducer,
  usersReducer,
};

export const actions = {
  ...authActions,
  ...usersActions,
};
