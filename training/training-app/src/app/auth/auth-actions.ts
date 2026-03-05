import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Account, UserCredentials } from '../models/user-model';

export const loginActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login With User': props<{ credentials: UserCredentials }>(),
    'Login Success': props<{ account: Account }>(),
    'Login Failure': props<{ error: string }>(),
    Logout: emptyProps(),
  },
});
