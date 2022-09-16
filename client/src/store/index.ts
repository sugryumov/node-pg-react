import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authService";
import { usersApi } from "../services/usersService";
import { reducers } from "./reducers";

const rootReducer = combineReducers({
  ...reducers,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
