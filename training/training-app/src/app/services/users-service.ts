import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginCredentials, User } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(credentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(this.apiUrl, credentials);
  }

  removeUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
