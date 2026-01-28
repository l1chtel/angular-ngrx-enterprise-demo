// core/auth/services/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, ignoreElements, catchError, switchMap } from 'rxjs/operators';

import { Account } from '../models/user-model';
import { UserCredentials } from '../models/user-model';
import { UserService } from './users-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userService = inject(UserService);
  private http = inject(HttpClient);

  login(credentials: UserCredentials): Observable<Account> {
    return this.userService.getCredentials().pipe(
      map((users: UserCredentials[]) => {
        const normalizedUsername = credentials.username.trim().toLowerCase();
        const foundUser = users.find(
          (u) =>
            u.username.toLowerCase() === normalizedUsername && u.password === credentials.password,
        );

        if (!foundUser) {
          throw new Error('Invalid credentials');
        }

        const { password, ...userAccount } = foundUser;

        return {
          ...userAccount,
          creationDate: new Date().toISOString(),
          role: userAccount.username === 'Alice' ? 'admin' : 'user',
        } as Account;
      }),
    );
  }
}
