import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from '../services/users-service';
import { UserActions, OrganizingUsersActions } from './user-action';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  private store = inject(Store);
  private router = inject(Router);
  private userService = inject(UserService);

  constructor(private actions$: Actions) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      exhaustMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(UserActions.loadUsersFailure({ error: error.message || 'Failed to load users' }))
          )
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizingUsersActions.addUser),
      exhaustMap(({ credentials }) =>
        this.userService.addUser(credentials).pipe(
          map((savedUser) => OrganizingUsersActions.addUserSuccess({ user: savedUser })),
          catchError((error) =>
            of(
              OrganizingUsersActions.addUserFailure({
                error: error.message || 'Failed to add user',
              })
            )
          )
        )
      )
    )
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizingUsersActions.removeUser),
      exhaustMap(({ userId }) =>
        this.userService.removeUser(userId).pipe(
          map(() => OrganizingUsersActions.removeUserSuccess({ userId })),
          catchError((error) =>
            of(
              OrganizingUsersActions.removeUserFailure({
                error: error.message || 'Failed to remove user',
              })
            )
          )
        )
      )
    )
  );
}
