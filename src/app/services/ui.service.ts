import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask: boolean;
  private subject = new Subject<any>();

  constructor() {}

  // set toggleAddTask() to void because it doesn't return anything

  // toggleAddTask modifies this.subject
  toggleAddTask(): void {
    console.log('TOGGLE');
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  // onToggle returns observable subject
  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
