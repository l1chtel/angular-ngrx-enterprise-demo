import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OrganizingUsersActions } from '../state/user-action';
import { map, startWith } from 'rxjs/operators';
import { loginActions } from '../auth/auth-actions';
import { selectIsLoading, selectAuthError } from '../auth/auth.selectors';
import { MATERIAL_MODULES } from '../Imports/Imports';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  hidePassword = signal(true);
  formValid$ = this.loginForm.statusChanges.pipe(
    map(() => this.loginForm.valid),
    startWith(this.loginForm.valid)
  );

  isLoading$ = this.store.select(selectIsLoading);
  error$ = this.store.select(selectAuthError);

  login() {
    const { username, password } = this.loginForm.value || {};
    if (username && password) {
      this.store.dispatch(loginActions.loginWithUser({ credentials: this.loginForm.value }));
      this.loginForm.reset();
    }
  }

  addUsers() {
    const { username, password } = this.loginForm.value || {};
    if (username && password) {
      this.store.dispatch(OrganizingUsersActions.addUser({ credentials: this.loginForm.value }));
      this.loginForm.reset();
    }
  }

  togglePasswordVisibility() {
    this.hidePassword.update((hide) => !hide);
  }
}
