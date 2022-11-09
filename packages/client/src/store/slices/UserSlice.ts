import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGetUserResponse, ILogin, IServerReponse, IWinnerResponse } from '../api/Api';
import { RootState } from '../store';
import { IStats } from '../types';
interface IStore extends IServerReponse, ILogin, IWinnerResponse {
  stats: IStats;
  loggedIn: boolean;
}

const initialState: IStore = {
  username: '',
  email: '',
  stats: {
    wins: 0,
    losses: 0,
    draws: 0
  },
  winner: -1,
  computerMove: -1,
  errorMsg: '',
  loggedIn: false
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IGetUserResponse>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.stats = {
        wins: action.payload.stats.wins,
        losses: action.payload.stats.losses,
        draws: action.payload.stats.draws
      }
      state.loggedIn = true;
      state.errorMsg = null;
    },
    loginError: (state, action: PayloadAction<IServerReponse>) => {
      state.errorMsg = action.payload.errorMsg;
      state.loggedIn = false;
    },
    logout: (state) => {
      state.username = state.email = state.cookie = undefined;
      state.stats = {} as IStats;
      state.loggedIn = false;
      state.errorMsg = null;
    },
    updateStats: (state, action: PayloadAction<IWinnerResponse>) => {
      state.computerMove = action.payload.computerMove
      state.winner = action.payload.winner;
      state.stats = action.payload.stats;
    },
    updateCookie: (state, action: PayloadAction<IServerReponse>) => {
      state.cookie = action.payload.cookie;
    },
  }
});

export const { login, loginError, logout, updateStats, updateCookie } = UserSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectUsername = (state: RootState) => state.user.username;
export const selectEmail = (state: RootState) => state.user.email;
export const selectUserStats = (state: RootState) => state.user.stats;
export const selectUserLoggedIn = (state: RootState) => state.user.loggedIn;
export const selectUserErrorMsg = (state: RootState) => state.user.errorMsg;
export const selectCookieToken = (state: RootState) => state.user.cookie;
export const selectWinner = (state: RootState) => state.user.winner;
export const selectComputerMove = (state: RootState) => state.user.computerMove;
export default UserSlice.reducer;
