import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { WorkersListComponent } from "./components/workers-list/workers-list.component";
import { FlightsListComponent } from "./components/flights-list/flights-list.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, WorkersListComponent, FlightsListComponent],
  template: `
    <app-header />
    <app-workers-list />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
}
