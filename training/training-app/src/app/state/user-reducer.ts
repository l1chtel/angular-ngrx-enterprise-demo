import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user-model';
import { UserActions, clearSelectedUser, OrganizingUsersActions } from './user-action';

const { addUserSuccess, removeUserSuccess } = OrganizingUsersActions;

export interface UsersState {
  users: User[];
  loading: boolean;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
};

export const usersReducer = createReducer(
  initialState,

  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    users: [],
  })),

  on(addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(removeUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter((u) => u.id !== userId),
  })),

  on(clearSelectedUser, (state) => ({
    ...state,
    selectedId: null,
  }))
);
