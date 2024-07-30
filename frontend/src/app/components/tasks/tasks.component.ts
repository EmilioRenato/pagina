import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: any[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe(
      res => {
        console.log(res); // Verifica en la consola si los datos se reciben correctamente
        this.tasks = res;
      },
      err => console.error(err)
    );
  }
}
