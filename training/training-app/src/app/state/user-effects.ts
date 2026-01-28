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
  private getErrorMessage(err: any): string {
    return err.message || 'An unexpected error occurred';
  }
  constructor(private actions$: Actions) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      exhaustMap(() =>
        this.userService.getUsers().pipe(
          map((accounts) => UserActions.loadUsersSuccess({ users: accounts })),
          catchError((error) =>
            of(UserActions.loadUsersFailure({ error: this.getErrorMessage(error) })),
          ),
        ),
      ),
    ),
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
                error: this.getErrorMessage(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizingUsersActions.editUser),
      exhaustMap(({ userId, userData }) =>
        this.userService.editAccount(userId, userData).pipe(
          map((updatedUser) => OrganizingUsersActions.editUserSuccess({ user: updatedUser })),
          catchError((error) =>
            of(
              OrganizingUsersActions.editUserFailure({
                error: this.getErrorMessage(error),
              }),
            ),
          ),
        ),
      ),
    ),
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
                error: this.getErrorMessage(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
