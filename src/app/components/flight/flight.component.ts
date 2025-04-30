import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [],
  template: `
  `,
  styles: `
  `
})
export class FlightComponent {
  @Input() flight!: Flight;
  @Input() isSelected: boolean = false;
  @Output() flightClicked = new EventEmitter<Flight>();


  onClick() {
    console.log(this.flight.flightNumber);
    this.flightClicked.emit(this.flight);
  }
  
}
