import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '../store';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: {},
      jwt: '',
      // jwt: 'hello'
      // user: { user: 'User' },
   },
   reducers: {
      setJwt: (state, { payload }) => {
         state.jwt = payload;
      },
   },
});

export const { setJwt } = authSlice.actions;

export const selectAuthReducer = (state: RootState) => state.auth;

export const selectUser = createSelector(
   [selectAuthReducer],
   (auth) => auth.user,
);

export const selectJwt = createSelector(
   [selectAuthReducer],
   (auth) => auth.jwt,
);

export default authSlice.reducer;
