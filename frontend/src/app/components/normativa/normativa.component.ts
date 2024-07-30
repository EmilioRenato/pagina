import { Component, OnInit } from '@angular/core';
import { NormativaService } from '../../services/normativa.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-normativa',
  templateUrl: './normativa.component.html',
  styleUrls: ['./normativa.component.css']
})
export class NormativaComponent implements OnInit {
  normativas: any[] = [];
  normativa = { titulo: '', cuerpo: '', tipo: 'normativa' };

  constructor(private normativaService: NormativaService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getNormativas();
  }

  getNormativas(): void {
    this.normativaService.getNormativas().subscribe(data => {
      this.normativas = data;
    });
  }

  addNormativa(): void {
    if (this.isAdminOrOperator()) {
      this.normativaService.addNormativa(this.normativa).subscribe(() => {
        this.getNormativas(); // Refresh the list
        this.normativa = { titulo: '', cuerpo: '', tipo: 'normativa' }; // Reset form
      });
    }
  }

  isAdminOrOperator(): boolean {
    return this.authService.isAdmin() || this.authService.isOperator();
  }
}
