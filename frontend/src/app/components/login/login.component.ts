import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  singIn() {
    this.authService.singIn(this.user).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/private-tasks']);
      },
      err => console.log(err)
    );
  }

  constructor(private authService: AuthService, private router: Router) {}
}
