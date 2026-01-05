import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginActions } from '../auth/auth-actions';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss',
})
export class AccountPageComponent {
  private store = inject(Store);

  logout() {
    this.store.dispatch(loginActions.logout());
  }
}
