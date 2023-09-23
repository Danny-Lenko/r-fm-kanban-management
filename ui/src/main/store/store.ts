import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from './drawer/drawerSlice';
import dataReducer from './data/dataSlice';
import modalsReducer from './modals/modalSlice';
import authReducer from './auth/authSlice';

export const store = configureStore({
   reducer: {
      drawer: drawerReducer,
      data: dataReducer,
      modals: modalsReducer,
      auth: authReducer,
   },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
