import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IServerReponse } from '../api/Api';
import { RootState } from '../store';
import { IStats } from '../types/IUserModel';
interface IStore extends IServerReponse {
  loggedIn: boolean;
}

const initialState: IStore = {
  username: undefined,
  email: undefined,
  stats: {
    wins: 0,
    losses: 0,
    draws: 0
  },
  errorMsg: null,
  loggedIn: false
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IServerReponse>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.stats = action.payload.stats;
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
    },
    updateStats: (state, action: PayloadAction<IStats>) => {
      state.stats = action.payload;
    }
  }
});

export const { login, loginError, logout, updateStats } = UserSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectUserStats = (state: RootState) => state.user.stats;
export const selectUserLoggedIn = (state: RootState) => state.user.loggedIn;
export const selectUserErrorMsg = (state: RootState) => state.user.errorMsg;
export default UserSlice.reducer;
