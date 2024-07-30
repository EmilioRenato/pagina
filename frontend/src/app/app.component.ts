import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corregido de 'styleUrl' a 'styleUrls'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  userRole: string | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.setUserRole();
  }

  setUserRole() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = this.parseJwt(token);
      this.userRole = payload.role;
    }
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map((c: any) =>
      `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
    return JSON.parse(base64);
  }

  isAdmin() {
    return this.userRole === 'admin';
  }

  isOperator() {
    return this.userRole === 'operator';
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }
}
