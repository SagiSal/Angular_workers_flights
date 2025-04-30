import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http:HttpClient) { }
  
  flightsList(workerId: number) : Observable<any> {
    return this.http.get(`/flights/${workerId}`);
  }
  
}
