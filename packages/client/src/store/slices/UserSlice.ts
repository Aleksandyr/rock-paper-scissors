import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICookie, IErrorMessage, IGetUserResponse, ILogin, IWinnerResponse } from '../api/Api';
import { RootState } from '../store';
import { IStats } from '../types';
interface IStore extends ILogin, IWinnerResponse, IErrorMessage, ICookie {
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
  error: '',
  cookie: '',
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
      state.error = null;
    },
    errorLog: (state, action: PayloadAction<IErrorMessage>) => {
      state.error = action.payload.error;
      state.loggedIn = false;
    },
    logout: (state) => {
      state.username = state.email = state.cookie = '';
      state.computerMove = -1;
      state.winner = -1;
      state.stats = {} as IStats;
      state.loggedIn = false;
      state.error = null;
    },
    updateStats: (state, action: PayloadAction<IWinnerResponse>) => {
      state.computerMove = action.payload.computerMove
      state.winner = action.payload.winner;
      state.stats = action.payload.stats;
    },
    updateCookie: (state, action: PayloadAction<ICookie>) => {
      state.cookie = action.payload.cookie;
    },
  }
});

export const { login, errorLog, logout, updateStats, updateCookie } = UserSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectUsername = (state: RootState) => state.user.username;
export const selectEmail = (state: RootState) => state.user.email;
export const selectUserStats = (state: RootState) => state.user.stats;
export const selectUserLoggedIn = (state: RootState) => state.user.loggedIn;
export const selectUserErrorMsg = (state: RootState) => state.user.error;
export const selectCookieToken = (state: RootState) => state.user.cookie;
export const selectWinner = (state: RootState) => state.user.winner;
export const selectComputerMove = (state: RootState) => state.user.computerMove;
export default UserSlice.reducer;
