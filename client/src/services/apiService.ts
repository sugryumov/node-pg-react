import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthResponse } from "../models/response/IAuthResponse";
import { authActions } from "../store/reducers/authSlice";

const baseQuery = fetchBaseQuery({
  credentials: "include",
  baseUrl: "http://localhost:9000/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const response = await baseQuery("/refresh", api, extraOptions);

    if (response?.data) {
      const { accessToken } = response.data as IAuthResponse;
      localStorage.setItem("token", accessToken);

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(authActions.logout());
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
