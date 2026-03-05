import { createReducer, on } from '@ngrx/store';
import { Account } from '../models/user-model';
import { UserActions, OrganizingUsersActions } from './user-action';

const { addUserSuccess, removeUserSuccess, editUserSuccess } = OrganizingUsersActions;

export interface UsersState {
  users: Account[];
  loading: boolean;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
};

export const usersReducer = createReducer(
  initialState,

  on(
    UserActions.loadUsers,
    OrganizingUsersActions.addUser,
    OrganizingUsersActions.editUser,
    OrganizingUsersActions.removeUser,
    (state) => ({ ...state, loading: true }),
  ),

  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
    loading: false,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    users: [],
    loading: false,

  })),

  on(addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false,
  })),


  on(removeUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter((u) => u.id !== userId),
    loading: false,
  })),

  on(editUserSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
    loading: false,
  })),
);
