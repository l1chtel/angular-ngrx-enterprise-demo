import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { selectAllUsers } from '../state/users.selectors';

import { Store } from '@ngrx/store';
import { CurrentAccount, selectUser } from '../auth/auth.selectors';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly routes = inject(Router);

  displayedColumns: string[] = ['avatar', 'name', 'id', 'email', 'status', 'actions'];

  readonly currentAccount = this.store.selectSignal(CurrentAccount);
  readonly selectedUser = this.store.selectSignal(selectUser);
  readonly users = this.store.selectSignal(selectAllUsers);

  logout(): void {
    this.store.dispatch(loginActions.logout());
  }
  ngOnInit() {
    if (this.currentAccount()?.role == 'Admin') {
      this.displayedColumns.pop();
      console.log(this.displayedColumns);
    }
  }
  deleteUser(userId: string) {
    this.currentAccount()!.id === userId
      ? this.logout()
      : this.store.dispatch(OrganizingUsersActions.removeUser({ userId }));
  }

  editUser(userId: string) {
    this.routes.navigate(['/account-page', userId]);
  }
}
