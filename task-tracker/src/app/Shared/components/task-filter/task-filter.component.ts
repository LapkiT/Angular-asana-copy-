import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    CommonModule,
    ReactiveFormsModule,
    NgFor],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss'
})
export class TaskFilterComponent {
  @Output() filterChanged = new EventEmitter<any>();

  statuses: string[] = ['ToDo', 'InProgress', 'Done'];
  priorities: string[] = ['High', 'Medium', 'Low'];
  assignees: string[] = ['Alice', 'Bob', 'Charlie']; 

  filterForm = new FormGroup({
    status: new FormControl(''),
    priority: new FormControl(''),
    assignee: new FormControl('')
  });

  constructor() {}

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(filters => {
      this.filterChanged.emit(filters);
    });
  }
}
