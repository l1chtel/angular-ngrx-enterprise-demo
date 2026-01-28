import { Component, inject } from '@angular/core';
import { selectAllUsers } from '../state/users.selectors';

import { Store } from '@ngrx/store';
import { selectUserName } from '../auth/auth.selectors';
import { loginActions } from '../auth/auth-actions';
import { Router, RouterLink } from '@angular/router';

import { OrganizingUsersActions } from '../state/user-action';
import { MATERIAL_MODULES } from '../Imports/Imports';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, MATERIAL_MODULES],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  private readonly store = inject(Store);
  readonly routes = inject(Router);

  displayedColumns: string[] = ['name', 'id', 'email', 'status', 'actions'];

  readonly user = this.store.selectSignal(selectUserName);
  readonly users = this.store.selectSignal(selectAllUsers);

  logout(): void {
    this.store.dispatch(loginActions.logout());
  }

  deleteUser(userId: string) {
    this.store.dispatch(OrganizingUsersActions.removeUser({ userId }));
  }

  editUser(userId: string) {
    this.routes.navigate(['/account-page', userId]);
  }
}
