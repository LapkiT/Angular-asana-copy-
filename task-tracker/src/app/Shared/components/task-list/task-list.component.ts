import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from '../../interfaces/task-models';
import { TaskServiceService } from '../../Services/task-service.service';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-task-list',
    standalone: true,
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss',
    imports: [
        NgFor,
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,    
        TaskFilterComponent
    ]
})
export class TaskListComponent implements OnInit{

editTask(arg0: string) {
throw new Error('Method not implemented.');
}
  tasks$!: Observable<Task[]>;
  allTasks: Task[] = [];

  constructor(private taskService: TaskServiceService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks$;
    this.taskService.tasks$.subscribe(tasks => this.allTasks = tasks);
  }
  
  onFilterChange(filters: any): void {
    this.tasks$ = this.taskService.tasks$.pipe(
      map(tasks => tasks.filter(task => 
        (filters.status ? task.status === filters.status : true) &&
        (filters.priority ? task.priority === filters.priority : true) &&
        (filters.assignee ? task.assignees.includes(filters.assignee) : true)
      ))
    );
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }
}
