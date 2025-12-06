import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './slices/mapSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    map: mapReducer,
    ui: uiReducer,
  },
});