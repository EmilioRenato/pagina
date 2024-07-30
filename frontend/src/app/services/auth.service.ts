import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode'; // Usa jwt_decode en lugar de jwtDecode

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router ) { }

  singUp(user: { email: string; password: string; role: string }) {
    return this.http.post<any>(this.URL + '/register', user);
  }
  
  singIn(user: { email: string; password: string }) {
    return this.http.post<any>(this.URL + '/login', user);
  }
  
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  
  getToken() {
    return localStorage.getItem('token');
  }
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwt_decode(token); // Usa jwt_decode
      return decoded.role === 'admin';
    }
    return false;
  }

  isOperator(): boolean {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwt_decode(token); // Usa jwt_decode
      return decoded.role === 'operator';
    }
    return false;
  }
  
}
