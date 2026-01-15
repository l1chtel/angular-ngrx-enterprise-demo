import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrganizingUsersActions, UserActions } from '../state/user-action';
import { map, startWith } from 'rxjs/operators';
import { loginActions } from '../auth/auth-actions';
import { selectIsLoading, selectAuthError } from '../auth/auth.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
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
