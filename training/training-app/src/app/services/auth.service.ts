
import { inject, Injectable } from '@angular/core';

import { Observable} from 'rxjs';
import { map, switchMap} from 'rxjs/operators';

import { Account } from '../models/user-model';
import { UserCredentials } from '../models/user-model';
import { UserService } from './users-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userService = inject(UserService);
  accounts$ = this.userService.getUsers().pipe(
  map(accounts => accounts.map(a => a.id))
);

login(credentials: UserCredentials): Observable<Account> {
  return this.userService.getCredentials().pipe(
    map((users: UserCredentials[]) => {
      const normalizedUsername = credentials.username.trim().toLowerCase();

      const foundUser = users.find(u =>
        u.username.trim().toLowerCase() === normalizedUsername &&
        u.password === credentials.password
      );

      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      return foundUser;
    }),
    switchMap(foundUser =>
      this.userService.getUsers().pipe(
        map((accounts: Account[]) => {
          const account = accounts.find(a => a.id === foundUser.id);

          if (!account) {
            throw new Error('Account not found');
          }

          return account;
        })
      )
    )
  );
}}
