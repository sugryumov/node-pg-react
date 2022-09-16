import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IAuthRequest } from "../models/request/IAuthRequest";
import { IAuthResponse } from "../models/response/IAuthResponse";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    credentials: "include",
    baseUrl: "http://localhost:9000/api/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<IAuthResponse, IAuthRequest>({
      query: (params) => ({
        url: "/login",
        method: "POST",
        body: params,
      }),
    }),

    registration: builder.mutation<IAuthResponse, IAuthRequest>({
      query: (params) => ({
        url: "/registration",
        method: "POST",
        body: params,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    checkAuth: builder.query<IAuthResponse, unknown>({
      query: () => ({
        url: "/refresh",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useLogoutMutation,
  useCheckAuthQuery,
} = authApi;