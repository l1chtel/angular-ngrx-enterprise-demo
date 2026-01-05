// core/auth/services/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
            user.name?.trim().toLowerCase() === normalizedUsername &&
            user.password === credentials.password
        );

        if (!matchingUser) {
          throw new Error('Invalid credentials');
        }

        return {
          ...matchingUser,
          email: `${matchingUser.name}@demo.com`,
          role: matchingUser.name === 'Alice' ? 'admin' : 'user',
          phoneNumber: matchingUser.name === 'Alice' ? '+49123456789' : undefined,
        } as Account;
      })
    );
  }
}
