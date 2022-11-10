import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/Sagas';

import UserReducer from './slices/UserSlice';
import StatsReducer from './slices/StatsSlice';
import ErrorSlice from './slices/ErrorSlice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: UserReducer,
  stats: StatsReducer,
  error: ErrorSlice
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
    }
  })
  sagaMiddleware.run(rootSaga);
  
  return store;
};


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];