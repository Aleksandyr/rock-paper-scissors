import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICookie, ILogin, IWinner } from '../types';
import { RootState } from '../store';

interface IStore extends ILogin, ICookie, IWinner {
  loggedIn: boolean;
}

const initialState: IStore = {
  username: '',
  email: '',
  winner: -1,
  computerMove: -1,
  cookie: '',
  loggedIn: false
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILogin>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.username = state.email = state.cookie = '';
      state.computerMove = -1;
      state.winner = -1;
      state.loggedIn = false;
      state.loggedIn = false;
    },
    move: (state, action: PayloadAction<IWinner>) => {
      state.computerMove = action.payload.computerMove;
      state.winner = action.payload.winner;
    },
    clearUserMove(state) {
      state.computerMove = -1;
      state.winner = -1;
    },
    updateCookie: (state, action: PayloadAction<ICookie>) => {
      state.cookie = action.payload.cookie;
    }
  }
});

export const { login, logout, move, updateCookie, clearUserMove } = UserSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectUsername = (state: RootState) => state.user.username;
export const selectEmail = (state: RootState) => state.user.email;
export const selectUserLoggedIn = (state: RootState) => state.user.loggedIn;
export const selectCookieToken = (state: RootState) => state.user.cookie;
export const selectWinner = (state: RootState) => state.user.winner;
export const selectComputerMove = (state: RootState) => state.user.computerMove;
export default UserSlice.reducer;
