import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Account, UserCredentials } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = '/api/users';
  private accountsUrl = '/api/accounts';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl);
  }

  getCredentials(): Observable<UserCredentials[]> {
    return this.http.get<UserCredentials[]>(this.usersUrl);
  }

  addUser(credentials: UserCredentials): Observable<Account> {
    const timestamp = new Date().toISOString();

    return this.http.post<UserCredentials>(this.usersUrl, credentials).pipe(
      switchMap((newUser) => {
        const { password, ...userWithoutPassword } = credentials;
        const emptyAccount: Account = {
          ...userWithoutPassword,
          id: newUser.id,
          creationDate: timestamp,
          active: true,
          role: 'User',
        };
        return this.http.post<Account>(this.accountsUrl, emptyAccount);
      }),
    );
  }

  editAccount(userId: string, userData: Partial<Account>): Observable<Account> {
    return this.http.put<Account>(`${this.accountsUrl}/${userId}`, userData);
  }

  removeUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.accountsUrl}/${userId}`);
  }
}
