import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from '../../Services/task-service.service';
import { Priority, Status } from '../../interfaces/task-models';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: string | null;

  constructor(
    private fb: FormBuilder, 
    private taskService: TaskServiceService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: [Priority.Medium, Validators.required],
      status: [Status.ToDo, Validators.required],
      assignees: ['', Validators.required]
    });

    if (this.taskId) {
      const task = this.taskService.getTaskById(this.taskId);
      if (task) {
        this.taskForm.patchValue(task);
      }
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;

      if (this.taskId) {
        this.taskService.updateTask({ id: this.taskId, ...taskData });
      } else {
        const newTaskId = Date.now().toString(); 
        this.taskService.addTask({ id: newTaskId, ...taskData });
      }

      this.router.navigate(['/tasks']);
    }
  }
}
