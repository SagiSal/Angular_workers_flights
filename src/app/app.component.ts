import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkersListComponent } from "./components/workers-list/workers-list.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkersListComponent],
  template: `
    <app-workers-list />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
}
