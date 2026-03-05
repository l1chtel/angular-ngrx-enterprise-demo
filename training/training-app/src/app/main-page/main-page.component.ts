import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { selectAllUsers, userStateIsLoading } from '../state/users.selectors';

import { Store } from '@ngrx/store';
import { CurrentAccount, selectUser } from '../auth/auth.selectors';
import { loginActions } from '../auth/auth-actions';
import { Router, RouterLink } from '@angular/router';

import { OrganizingUsersActions } from '../state/user-action';
import { MATERIAL_MODULES } from '../Imports/Imports';
import { DialogWindowComponent } from '../dialog-window/dialog-window.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject, take, takeUntil } from 'rxjs';

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
  private readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['avatar', 'name', 'id', 'email', 'status', 'actions'];

  readonly currentAccount = this.store.selectSignal(CurrentAccount);
  readonly selectedUser = this.store.selectSignal(selectUser);
  readonly users = this.store.selectSignal(selectAllUsers);
  readonly isLoading = this.store.selectSignal(userStateIsLoading);


  logout(): void {
    this.store.dispatch(loginActions.logout());
  }
  ngOnInit() {
    if (this.currentAccount()?.role == 'Admin') {
      this.displayedColumns.pop();
      console.log(this.displayedColumns);
    }
  }



deleteDialog(username: string, userId: string) {
  const dialogRef = this.dialog.open(DialogWindowComponent, {
    width: '250px',
    data: { text: `Are you sure you want to delete ${username}?` },
  });
  dialogRef.afterClosed().pipe(take(1)).subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.executeDeletion(userId);
    }
  });
}


  private executeDeletion(userId: string) {
  if (this.currentAccount()?.id === userId) {
    this.logout();
  } else {
    this.store.dispatch(OrganizingUsersActions.removeUser({ userId }));
  }
}

  editUser(userId: string) {
    this.routes.navigate(['/account-page', userId]);
  }
}

