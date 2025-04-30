import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { FlightsService } from '../../services/flights.service';
import { FlightComponent } from "../flight/flight.component";
import { DurationPipe } from "../../pipes/duration.pipe";
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-flights-list',
  standalone: true,
  imports: [FlightComponent, DurationPipe, MatTableModule],
  template: `
    <div class="flights-list-container">
      <div class="flights-list">
        <h4>Flights List</h4>
        <mat-table [dataSource]="flights" class="mat-elevation-z8">
        
          <!-- Flight Number Column -->
          <ng-container matColumnDef="flightNumber">
            <mat-header-cell *matHeaderCellDef> Flight Number </mat-header-cell>
            <mat-cell *matCellDef="let flight"> {{ flight.flightNumber }} </mat-cell>
          </ng-container>
        
          <!-- Origin Column -->
          <ng-container matColumnDef="origin">
            <mat-header-cell *matHeaderCellDef> Origin </mat-header-cell>
            <mat-cell *matCellDef="let flight"> {{ flight.origin }} </mat-cell>
          </ng-container>
        
          <!-- Origin Date Column -->
          <ng-container matColumnDef="originDate">
            <mat-header-cell *matHeaderCellDef> Origin Date </mat-header-cell>
            <mat-cell *matCellDef="let flight"> {{ flight.originDate }} </mat-cell>
          </ng-container>
        
          <!-- Destination Column -->
          <ng-container matColumnDef="destination">
            <mat-header-cell *matHeaderCellDef> Destination </mat-header-cell>
            <mat-cell *matCellDef="let flight"> {{ flight.destination }} </mat-cell>
          </ng-container>
        
          <!-- Destination Date Column -->
          <ng-container matColumnDef="destinationDate">
            <mat-header-cell *matHeaderCellDef> Destination Date </mat-header-cell>
            <mat-cell *matCellDef="let flight"> {{ flight.destinationDate }} </mat-cell>
          </ng-container>
        
          <mat-header-row *matHeaderRowDef="['flightNumber', 'origin', 'originDate', 'destination', 'destinationDate']"></mat-header-row>
          <mat-row *matRowDef="let row; columns: ['flightNumber', 'origin', 'originDate', 'destination', 'destinationDate']"
            (click)="selectFlight(row)"
            [style.background-color]="row === selectedFlight ? 'lightgrey' : '#fff'">
          </mat-row>
        
        </mat-table>
      </div>
        <div class="flight-details">
          <h4>Flight Details</h4>
          <mat-table [dataSource]="[selectedFlight]" class="mat-elevation-z8">

        <!-- Plane Number Column -->
        <ng-container matColumnDef="planeNumber">
          <mat-header-cell *matHeaderCellDef> Plane Number </mat-header-cell>
          <mat-cell *matCellDef="let flight"> {{ flight?.planeNumber }} </mat-cell>
        </ng-container>
        
        <!-- Duration Column -->
        <ng-container matColumnDef="duration">
          <mat-header-cell *matHeaderCellDef> Duration </mat-header-cell>
          <mat-cell *matCellDef="let flight"> {{ flight?.duration | duration }} </mat-cell>
        </ng-container>
        
        <!-- Origin Gate Column -->
        <ng-container matColumnDef="originGate">
          <mat-header-cell *matHeaderCellDef> Origin Gate </mat-header-cell>
          <mat-cell *matCellDef="let flight"> {{ flight?.originGate }} </mat-cell>
        </ng-container>
        
        <!-- Destination Gate Column -->
        <ng-container matColumnDef="destinationGate">
          <mat-header-cell *matHeaderCellDef> Destination Gate </mat-header-cell>
          <mat-cell *matCellDef="let flight"> {{ flight?.destinationGate }} </mat-cell>
        </ng-container>
        
        <mat-header-row *matHeaderRowDef="['planeNumber', 'duration', 'originGate', 'destinationGate']"></mat-header-row>
        <mat-row *matRowDef="let row; columns: ['planeNumber', 'duration', 'originGate', 'destinationGate']"></mat-row>
        
          </mat-table>
      </div>
    </div>
  `,
  styles: `
  .flights-list-container {
    display: flex;
    width: 100%;
  }
  .flights-list {
    width: 75%;
    text-align: center;
    
  }
  .flight-details {
    float: right;
    width: 25%;
  }
  div {
    border: 1px solid #000;
  }
  h4 {
    text-align: center;
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
