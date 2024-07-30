import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  noticias: any[] = [];
  noticia = { titulo: '', cuerpo: '', tipo: 'noticia' };

  constructor(private noticiasService: NoticiasService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getNoticias();
  }

  getNoticias(): void {
    this.noticiasService.getNoticias().subscribe(data => {
      this.noticias = data;
    });
  }

  addNoticia(): void {
    if (this.isAdminOrOperator()) {
      this.noticiasService.addNoticia(this.noticia).subscribe(() => {
        this.getNoticias(); // Refresh the list
        this.noticia = { titulo: '', cuerpo: '', tipo: 'noticia' }; // Reset form
      });
    }
  }

  isAdminOrOperator(): boolean {
    return this.authService.isAdmin() || this.authService.isOperator();
  }
}
