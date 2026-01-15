import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { AccountPageComponent } from './account-page/account-page.component';
import { Store } from '@ngrx/store';
import { UserActions } from './state/user-action';
import { Account } from './models/user-model';
import { loginActions } from './auth/auth-actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal('training-app');
  private store = inject(Store);

  ngOnInit() {
    const saved = localStorage.getItem('currentAccount');
    if (saved) {
      const account: Account = JSON.parse(saved);
      this.store.dispatch(loginActions.loginSuccess({ account }));
    }
    this.store.dispatch(UserActions.loadUsers());
  }
}
