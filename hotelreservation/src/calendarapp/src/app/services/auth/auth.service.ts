import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8080/api';
  private tokenKey: string = 'token';

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/auth/register`, user, { headers, responseType: 'text' });
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, user, { responseType: 'text' })
  }


  login(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }


}

