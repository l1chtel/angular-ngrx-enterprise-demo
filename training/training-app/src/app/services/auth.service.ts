// core/auth/services/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, ignoreElements } from 'rxjs/operators';

import { LoginCredentials } from '../models/user-model';
import { Account } from '../models/user-model';
import { User } from '../models/user-model';
import { UserService } from './users-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = '/api/users';

  constructor(private http: HttpClient) {}
  private userService = inject(UserService);

  login(credentials: LoginCredentials): Observable<Account> {
    return this.userService.getUsers().pipe(
      map((data) => {
        if (!credentials.username?.trim() || !credentials.password?.trim()) {
          throw new Error('Username and password required');
        }

        const normalizedUsername = credentials.username.trim().toLowerCase();
        const matchingUser = data.find(
          (user: User) =>
            user.username?.trim().toLowerCase() === normalizedUsername &&
            user.password === credentials.password
        );

        if (!matchingUser) {
          throw new Error('Invalid credentials');
        }

        return {
          ...matchingUser,
          email: `${matchingUser.username}@demo.com`,
          role: matchingUser.username === 'Alice' ? 'admin' : 'user',
          phoneNumber: matchingUser.username === 'Alice' ? '+49123456789' : undefined,
        } as Account;
      })
    );
  }

  // currently obsolete -> bc of mockServer
  logout(): Observable<void> {
    return this.http.post<void>('/api/logout', {}).pipe(ignoreElements());
  }
}
