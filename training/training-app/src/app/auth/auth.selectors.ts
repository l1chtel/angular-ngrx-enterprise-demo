import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(selectAuthState, (state) => state.isLoggedIn);

export const selectCurrentAccount = createSelector(
  selectAuthState,
  (state) => state.currentAccount
);

export const selectIsLoading = createSelector(selectAuthState, (state) => state.loading);

export const selectAuthError = createSelector(selectAuthState, (state) => state.error);

export const selectUserRole = createSelector(
  selectCurrentAccount,
  (account): string => account?.role ?? 'guest'
);

export const selectUserName = createSelector(
  selectCurrentAccount,
  (account) => account?.username ?? ''
);
