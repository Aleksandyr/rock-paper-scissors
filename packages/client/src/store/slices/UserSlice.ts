import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserModel } from '../types/UserModel';

const initialState: UserModel = {
  username: undefined,
  email: undefined
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserModel>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.username = state.email = undefined;
    }
  }
});

export const { login, logout } = UserSlice.actions;
// export const selectUser = (state: RootState) => {state.user};
export default UserSlice.reducer;
