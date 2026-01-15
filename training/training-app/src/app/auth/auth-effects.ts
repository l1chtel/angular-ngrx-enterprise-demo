// core/auth/+state/auth.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { loginActions } from '../auth/auth-actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private actions$: Actions) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.loginWithUser),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((account) => loginActions.loginSuccess({ account })),
          tap(({ account }) => {
            localStorage.setItem('currentAccount', JSON.stringify(account));
          }),
          catchError((error) => of(loginActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  loginSuccessNavigation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginActions.loginSuccess),
        tap(() => this.router.navigate(['main-page']))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginActions.logout),
        tap(() => {
          localStorage.removeItem('currentAccount');
          this.router.navigate(['login-page']);
        })
      ),
    { dispatch: false }
  );
}
