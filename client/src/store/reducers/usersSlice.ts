import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/models/IUser';

const initialState: IUser[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (_, { payload }) => payload,
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;
