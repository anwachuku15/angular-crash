import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  showAddTask: boolean = false;
  subscription: Subscription;

  // in order to use a SERVICE or a MODULE, you must add it to your contructor as a PROVIDER
  constructor(private uiService: UiService, private router: Router) {
    // watch toggleAddTask to set
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  toggleAdd() {
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string) {
    // is the route variable the same as the current route
    // in this case, we'll pass in the home route in order to return a boolean
    return this.router.url === route;
  }
}
