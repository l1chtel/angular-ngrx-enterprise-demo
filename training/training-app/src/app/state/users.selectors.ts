import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from '../state/user-reducer'; // Import from your reducer to stay synced

const getUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(getUsersState, (state) => state.users);
