import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/interfaces/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  // When working with Forms, put PROPERTY for each field
  text: string;
  day: string;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  // create two-way data binding between the PROPERTY and INPUT
  // by using ngModel directive in this component's html (add-task-component.html) - set up FORMS MODULE in app.module

  // Allow this component to respond to the UiService's onToggle event
  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) {
      alert('Please add a task');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    // Emit event to parent component (tasks)
    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
