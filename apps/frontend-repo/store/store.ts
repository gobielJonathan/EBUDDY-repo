// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authReducer, usersReducer } from './reducers';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: usersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
