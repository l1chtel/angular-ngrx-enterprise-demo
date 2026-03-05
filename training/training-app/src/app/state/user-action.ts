import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Account, UserCredentials } from '../models/user-model';

export const UserActions = createActionGroup({
  source: 'User API',
  events: {
    loadUsers: emptyProps(),
    loadUsersSuccess: props<{ users: Account[] }>(),
    loadUsersFailure: props<{ error: string }>(),
  },
});

export const OrganizingUsersActions = createActionGroup({
  source: 'Organizing Users',
  events: {
    addUser: props<{ credentials: UserCredentials }>(),
    addUserSuccess: props<{ user: Account }>(),
    addUserFailure: props<{ error: string }>(),

    removeUser: props<{ userId: string }>(),
    removeUserSuccess: props<{ userId: string }>(),
    removeUserFailure: props<{ error: string }>(),

    editUser: props<{ userId: string; userData: Partial<Account> }>(),
    editUserSuccess: props<{ user: Account }>(),
    editUserFailure: props<{ error: string }>(),
  },
});

export const clearSelectedUser = createAction('[User UI] Clear Selected User');

export interface UserErrorPayload {
  error: string;
}

export const userError = createAction('[User API] Error', props<UserErrorPayload>());
