import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {

  privateTasks: any[] = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getPrivateTasks().subscribe(
      (res: any[]) => {
        console.log(res); // Verifica en la consola si los datos se reciben correctamente
        this.privateTasks = res;
      },
      (err: any) => console.error(err)
    );
  }
}
