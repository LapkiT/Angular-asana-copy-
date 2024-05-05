import { Routes } from '@angular/router';
import { TaskListComponent } from './Shared/components/task-list/task-list.component';
import { TaskFormComponent } from './Shared/components/task-form/task-form.component';
import { TaskDetailComponent } from './Shared/components/task-detail/task-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'tasks', component: TaskListComponent },
    { path: 'tasks/new', component: TaskFormComponent },
    { path: 'tasks/:id', component: TaskDetailComponent },
    { path: 'tasks/:id/edit', component: TaskFormComponent }
];
