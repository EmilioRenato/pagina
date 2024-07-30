import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiUrl = 'http://localhost:3000/api/posts'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) { }

  getNoticias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '?tipo=noticia');
  }

  addNoticia(noticia: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, noticia);
  }
}
