import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  credentials: "include",
  baseUrl: "http://localhost:9000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    // const refreshResult = await baseQuery("/refreshToken", api, extraOptions);
    // if (refreshResult.data) {
    //   // store the new token
    //   api.dispatch(tokenReceived(refreshResult.data));
    //   // retry the initial query
    //   result = await baseQuery(args, api, extraOptions);
    // } else {
    //   api.dispatch(loggedOut());
    // }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
