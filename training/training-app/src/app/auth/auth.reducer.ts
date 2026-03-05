// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loginActions } from './auth-actions';
import { Account } from '../models/user-model';

// auth/auth.state.ts
export interface AuthState {
  isLoggedIn: boolean;
  currentAccount: Account | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  currentAccount: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(loginActions.loginWithUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loginActions.loginSuccess, (state, { account }) => ({
    ...state,
    isLoggedIn: true,
    currentAccount: account,
    loading: false,
    error: null,
  })),

  on(loginActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    currentAccount: null,
    loading: false,
    error,
  })),

  on(loginActions.logout, () => initialAuthState)
);
