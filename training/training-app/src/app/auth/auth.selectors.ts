import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(selectAuthState, (state) => state.isLoggedIn);

export const CurrentAccount = createSelector(selectAuthState, (state) => state.currentAccount);

export const selectIsLoading = createSelector(selectAuthState, (state) => state.loading);

export const selectAuthError = createSelector(selectAuthState, (state) => state.error);

export const selectUser = createSelector(CurrentAccount, (account) => account);
