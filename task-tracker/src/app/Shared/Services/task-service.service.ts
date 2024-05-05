import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task-models';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.loadTasks());

  get tasks$(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  private loadTasks(): Task[] {
    const tasksJson = localStorage.getItem('tasks');
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  getTaskById(id: string): Task | undefined {
    const tasks = this.loadTasks();
    return tasks.find(task => task.id === id);
  }

  addTask(task: Task): void {
    const tasks = this.loadTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.loadTasks();
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    if (index > -1) {
      tasks[index] = updatedTask;
      this.saveTasks(tasks);
    }
  }

  deleteTask(id: string): void {
    const tasks = this.loadTasks();
    const newTasks = tasks.filter(task => task.id !== id);
    this.saveTasks(newTasks);
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }
}
