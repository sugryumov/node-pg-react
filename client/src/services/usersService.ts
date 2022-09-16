import { IUser } from "../models/IUser";
import { api } from "./apiService";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query<IUser[], void>({
      query: () => ({
        url: `/users`,
      }),
    }),
  }),
});

export const { useFetchUsersQuery } = usersApi;
