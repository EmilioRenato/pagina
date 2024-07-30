import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  user = {
    email: '',
    password: '',
    role: 'operator' // Por defecto, el rol es 'operator'
  }

  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/tasks']); // Redirige si no es admin
    }
  }

  singUp() {
    this.authService.singUp(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/private-tasks']);
        },
        err => console.log(err)
      );
  }
}
