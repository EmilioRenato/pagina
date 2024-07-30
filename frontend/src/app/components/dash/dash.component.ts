import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  tasks: any[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getPrivateTasks().subscribe(
      res => {
        console.log('Private Tasks:', res);
        this.tasks = res;
      },
      err => console.error('Error:', err)
    );
  }
}
