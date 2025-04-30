import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-flights-list',
  standalone: true,
  imports: [],
  template: `
    <div style="display: inline-block; vertical-align: top; margin-left:30px; gap: 2rem width: 50% float: right">
      <h4>Flights List</h4>
      <table>
        <tr>
          <th>Flight Number</th>
          <th>Origin</th>
          <th>Origin Date</th>
          <th>Destination</th>
          <th>Destination Date</th>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  `,
  styles: `
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
  }`
})
export class FlightsListComponent implements OnChanges {
  constructor(private flightsService: FlightsService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.workerId) {
      this.loadFlights(this.workerId);
    }
  }
  @Input() workerId!: number | null;
  @Output() flightSelected = new EventEmitter<Flight>();

  private loadFlights(id: number) {
    this.flightsService.flightsList(id).subscribe((flights: Flight[]) => {
      console.log(flights);
    })

  }
}
