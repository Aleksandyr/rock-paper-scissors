import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IStats } from '../types';

const initialState: IStats = {
  wins: 0,
  losses: 0,
  draws: 0
};

export const StateSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    clearStats: (state) => {
      state.wins = 0;
      state.losses = 0;
      state.draws = 0;
    },
    updateStats: (state, action: PayloadAction<IStats>) => {
      state.draws = action.payload.draws;
      state.wins = action.payload.wins;
      state.losses = action.payload.losses;
    }
  }
});

export const { clearStats, updateStats } = StateSlice.actions;
export const selectStats = (state: RootState) => state.stats;
export default StateSlice.reducer;
