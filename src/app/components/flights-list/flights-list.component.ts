import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { FlightsService } from '../../services/flights.service';
import { DurationPipe } from "../../pipes/duration.pipe";
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-flights-list',
  standalone: true,
  imports: [DurationPipe, MatTableModule],
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
            [style.background-color]="row === selectedFlight ? 'lightgrey' : '#fff'"
            [style.cursor]="'pointer'"
            (mouseenter)="row.hover = true"
            (mouseleave)="row.hover = false"
            [style.background-color]="row.hover ? '#f0f0f0' : (row === selectedFlight ? 'lightgrey' : '#fff')">
          </mat-row>
        
        </mat-table>
      </div>
      <div class="flight-details">
      <h4>Flight Details</h4>
      <table>
        <tr>
          <td class="label">Plane Number:</td>
          <td class="value">{{ selectedFlight?.planeNumber }}</td>
        </tr>
        <tr>
          <td class="label">Duration:</td>
          <td class="value">{{ selectedFlight?.duration | duration }}</td>
        </tr>
        <tr>
          <td class="label">Origin Gate:</td>
          <td class="value">{{ selectedFlight?.originGate }}</td>
        </tr>
        <tr>
          <td class="label">Destination Gate:</td>
          <td class="value">{{ selectedFlight?.destinationGate }}</td>
        </tr>
      </table>
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
    border: 1px solid #000;
  }
  .flight-details {
    float: right;
    width: 25%;
    border: 1px solid #000;
  }
  .flight-details td.label {
    text-align: left;
    padding-left: 10px;
    font-weight: bold;
  }
  .flight-details td.value {
    text-align: right;
    padding-right: 10px;
  }
  h4 {
    text-align: center;
    background-color: lightblue;
    padding: 10px;
    margin: 10px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
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
