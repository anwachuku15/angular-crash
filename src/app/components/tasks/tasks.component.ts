import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/Task';
import { TASKS } from 'src/app/mock-tasks';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  // in order to use a SERVICE, you must add it to your contructor
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // use Observables to deal with Asynchronous data from server
    // subscribe to Observable to constantly watch it
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  // delete a task from server, then filter it out of the UI
  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        (tasks) => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }
}
