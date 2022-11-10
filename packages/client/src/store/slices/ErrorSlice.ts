import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IErrorMessage } from '../api/Api';
import { RootState } from '../store';

const initialState: IErrorMessage = {
  error: ''
};

export const ErrorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
    updateError: (state, action: PayloadAction<IErrorMessage>) => {
      state.error = action.payload.error;
    }
  }
});

export const { clearError, updateError } = ErrorSlice.actions;
export const selectError = (state: RootState) => state.error.error;

export default ErrorSlice.reducer;
