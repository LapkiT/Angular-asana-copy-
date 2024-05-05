import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskServiceService } from '../../Services/task-service.service';
import { Priority, Status } from '../../interfaces/task-models';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: string | null;

  constructor(private fb: FormBuilder, private taskService: TaskServiceService, private router: Router, private route: ActivatedRoute) {}

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
