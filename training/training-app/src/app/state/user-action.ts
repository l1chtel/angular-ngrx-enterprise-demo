import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Account, User } from '../models/user-model';

export const UserActions = createActionGroup({
  source: 'User API',
  events: {
    loadUsers: emptyProps(),
    loadUsersSuccess: props<{ users: User[] }>(),
    loadUsersFailure: props<{ error: string }>(),
  },
});

export const OrganizingUsersActions = createActionGroup({
  source: 'Organizing Users',
  events: {
    addUser: props<{ user: User }>(),
    addUserSuccess: props<{ user: User }>(),
    addUserFailure: props<{ error: string }>(),
    removeUser: props<{ userId: string }>(),
    removeUserSuccess: props<{ userId: string }>(),
    removeUserFailure: props<{ error: string }>(),
  },
});
export const clearSelectedUser = createAction('[User UI] Clear Selected User');

export interface UserErrorPayload {
  error: string;
}

export const userError = createAction('[User API] Error', props<UserErrorPayload>());
