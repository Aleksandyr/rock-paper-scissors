import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IServerReponse } from '../api/Api';
import { RootState } from '../store';

interface IStore extends IServerReponse {
  loggedIn: boolean;

}
const initialState: IStore = {
  username: undefined,
  email: undefined,
  errorMsg: null,
  loggedIn: false,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IServerReponse>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.loggedIn = true;
      state.errorMsg = null;
    },
    loginError: (state, action: PayloadAction<IServerReponse>) => {
      state.errorMsg = action.payload.errorMsg;
      state.loggedIn = false;
    },

    logout: (state) => {
      state.username = state.email = undefined;
      state.loggedIn = false;
      state.errorMsg = null;
    }
  }
});

export const { login, loginError, logout } = UserSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectUserLoggedIn = (state: RootState) => state.user.loggedIn;
export const selectUserErrorMsg = (state: RootState) => state.user.errorMsg;
export default UserSlice.reducer;
