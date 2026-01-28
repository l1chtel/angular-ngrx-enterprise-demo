import { Component, inject, OnInit, computed, signal, effect, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { selectAllUsers } from '../state/users.selectors';
import { OrganizingUsersActions } from '../state/user-action';
import { Account } from '../models/user-model';
import { MATERIAL_MODULES } from '../Imports/Imports';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MATERIAL_MODULES],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss',
})
export class AccountPageComponent {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);

  readonly id = input<string>();

  isEditMode = signal(false);
  hide = true;

  readonly displayedColumns = ['username', 'email', 'status', 'actions'];
  readonly allUsers = this.store.selectSignal(selectAllUsers);

  readonly selectedUser = computed(() => {
    const currentId = this.id();
    return this.allUsers().find((u) => u.id === currentId);
  });

  accountForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.email]],
    password: ['', [Validators.minLength(6)]],
    phoneNumber: [''],
    role: [''],
    active: [true],
  });

  constructor() {
    effect(() => {
      const user = this.selectedUser();
      if (user) {
        this.accountForm.patchValue(user);
      }
    });
  }

  toggleEdit(user?: Account) {
    if (this.isEditMode() && user) {
      this.accountForm.patchValue(user);
    }
    this.isEditMode.set(!this.isEditMode());
  }

  saveChanges(user: Account) {
    if (this.accountForm.invalid || !user?.id) return;

    this.store.dispatch(
      OrganizingUsersActions.editUser({
        userId: user.id,
        userData: this.accountForm.getRawValue(),
      }),
    );
    this.isEditMode.set(false);
  }

  onCancel(user: Account) {
    user && this.accountForm.patchValue(user);
    this.isEditMode.set(false);
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.store.dispatch(OrganizingUsersActions.removeUser({ userId: id }));
    }
  }
}
