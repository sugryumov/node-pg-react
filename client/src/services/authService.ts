import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IAuthRequest } from '@/models/request/IAuthRequest';
import { IAuthResponse } from '@/models/response/IAuthResponse';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    credentials: 'include',
    baseUrl: 'http://localhost:9000/api/',
  }),
  endpoints: builder => ({
    signIn: builder.mutation<IAuthResponse, IAuthRequest>({
      query: params => ({
        url: '/login',
        method: 'POST',
        body: params,
      }),
    }),

    signUp: builder.mutation<IAuthResponse, IAuthRequest>({
      query: params => ({
        url: '/registration',
        method: 'POST',
        body: params,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ email }) => ({
        url: '/reset-password',
        method: 'POST',
        body: { email },
      }),
    }),

    newPassword: builder.mutation({
      query: ({ password, resetPasswordLink }) => ({
        url: '/new-password',
        method: 'POST',
        body: { password, resetPasswordLink },
      }),
    }),

    checkAuth: builder.query<IAuthResponse, unknown>({
      query: () => ({
        url: '/refresh',
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useNewPasswordMutation,
  useCheckAuthQuery,
} = authApi;
