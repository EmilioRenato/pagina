import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NormativaService {
  private apiUrl = 'http://localhost:3000/posts'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }

  // Obtener todas las normativas
  getNormativas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Crear una nueva normativa
  addNormativa(normativa: any): Observable<any> {
    return this.http.post(this.apiUrl, normativa);
  }
}
