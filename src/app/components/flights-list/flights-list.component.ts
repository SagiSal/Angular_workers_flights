import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { FlightsService } from '../../services/flights.service';
import { FlightComponent } from "../flight/flight.component";
import { DurationPipe } from "../../pipes/duration.pipe";

@Component({
  selector: 'app-flights-list',
  standalone: true,
  imports: [FlightComponent, DurationPipe],
  template: `
    <div style="display: inline-block; vertical-align: top; margin-left:30px; gap: 2rem width: 70% float: right">
      <h4>Flights List</h4>
      <table>
        <tr>
          <th>Flight Number</th>
          <th>Origin</th>
          <th>Origin Date</th>
          <th>Destination</th>
          <th>Destination Date</th>
        </tr>
        @for (flight of flights; track flight.flightNumber) {

          <app-flight 
            [flight]="flight"
            [isSelected]="flight === selectedFlight"
            (flightClicked)="selectFlight($event)">
          </app-flight>
          <tr>
            <td> {{ flight.flightNumber }}</td>
            <td> {{ flight.origin }}</td>
            <td> {{ flight.originDate }}</td>
            <td> {{ flight.destination }}</td>
            <td> {{ flight.destinationDate }}</td>
          </tr>
        }
      </table>
    </div>
    <div class="flight-details">
      <h4>Flight Details</h4>
      <table>
        <tr><td>Plane Number:</td><td>{{ selectedFlight?.planeNumber }}</td></tr>
        <tr><td>Duration:</td><td>{{ selectedFlight?.duration | duration }}</td></tr>
        <tr><td>Origin Gate:</td><td>{{ selectedFlight?.originGate }}</td></tr>
        <tr><td>Destination Gate:</td><td>{{ selectedFlight?.destinationGate }}</td></tr>
      </table>
    </div>
  `,
  styles: `
  .flight-details {
    display: inline-block;
    vertical-align: top;
    //margin-left: 30px;
    gap: 2rem;
    width: 25%;
    float: right;
  }
  div {
    border: 1px solid #000;
  }
  h4 {
    text-align: center;
    color: #fff;
    background-color: lightblue;
    padding: 10px;
  }
  th {
    margin : 20px;
    padding : 20px;
  }
  td {
    text-align : center;
    margin : 10px;
    padding : 10px;
  }
  table {
    border-collapse: collapse;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  tr:hover {
    background-color: #ddd;
  }
  `
})
export class FlightsListComponent implements OnChanges {
  selectFlight(flight: Flight) {
    this.selectedFlight = flight;
  }
  constructor(private flightsService: FlightsService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.workerId) {
      this.loadFlights(this.workerId);
    }
  }
  flights: Flight[] = [];
  selectedFlight: Flight | null = null;
  
  @Input() workerId!: number | null;
  @Output() flightSelected = new EventEmitter<Flight>();

  private loadFlights(id: number) {
      this.flightsService.flightsList(id).subscribe((flights: Flight[]) => {
      this.flights = flights;
      if (this.flights.length > 0) {
        this.selectedFlight = this.flights[0];
      }
      console.log(this.flights);
    });

  }
}
