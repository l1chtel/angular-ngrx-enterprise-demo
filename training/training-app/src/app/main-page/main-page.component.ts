import { Component, computed, inject } from '@angular/core';
import { getSelectedUser, selectAllUsers } from '../state/users.selectors';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectUserName } from '../auth/auth.selectors';
import { loginActions } from '../auth/auth-actions';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  store = inject(Store);
  routes = inject(Router);

  readonly user = this.store.selectSignal(selectUserName)();
  readonly users = this.store.selectSignal(selectAllUsers)().length;

  logout() {
    this.store.dispatch(loginActions.logout());
  }
}
