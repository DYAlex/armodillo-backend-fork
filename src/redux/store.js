import { configureStore } from '@reduxjs/toolkit';
import { LS_KEY } from './constants';
import { getInitState } from './initState';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: getInitState(),
});

store.subscribe(() => {
  window.localStorage.setItem(LS_KEY, JSON.stringify(store.getState()));
});
