import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http:HttpClient) { }
  
  flightsList(workerId: number) : Observable<Flight[]> {
    return this.http.get(`/flights/${workerId}`)
      .pipe(
        map((data: any) => data.map((item: any) => ({
          id: item.id,
          flightNumber: item.num,
          origin: item.from,
          originDate: item.from_date,
          destination: item.to,
          destinationDate: item.to_date,
          planeNumber: item.plane,
          duration: item.duration,
          originGate: item.from_gate,
          destinationGate: item.to_gate
        })))
      );
  }
}