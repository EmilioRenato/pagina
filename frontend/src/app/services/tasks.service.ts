import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.URL); // Ajusta la URL según sea necesario
  }

  getPrivateTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/private-tasks`); // Ajusta la URL según sea necesario
  }
}
