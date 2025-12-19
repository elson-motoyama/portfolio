import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from './login/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7247/api/authentication';
  private loggedIn$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this.loggedIn$.asObservable();

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, login);
  }

  storeToken(token: string): void {
    localStorage.setItem('jwt', token);
     this.loggedIn$.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('jwt');
    this.loggedIn$.next(false);
  }
}
