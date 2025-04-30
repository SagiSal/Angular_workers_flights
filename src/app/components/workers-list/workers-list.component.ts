import { Component, Output, signal } from '@angular/core';
import { Worker } from '../../models/worker.model';
import { CommonModule } from '@angular/common';
import { WorkerComponent } from '../worker/worker.component';
import { WorkersService } from '../../services/workers.service';
import { map } from 'rxjs';
import { FlightsListComponent } from "../flights-list/flights-list.component";


@Component({
  selector: 'app-workers-list',
  standalone: true,
  imports: [CommonModule, WorkerComponent, FlightsListComponent],
  template: `
  <div style="display: inline-block; vertical-align: top; gap: 2rem width: 30% float: left">
    <h3>Workers</h3>
    <ul>
      @for(worker of workers(); track worker.name) { 
        <app-worker
        [worker]="worker"
        [isSelected]="worker === selectedWorker"
        (workerClicked)="selectWorker($event)">
          {{ worker.name }}
        </app-worker>
      }
    </ul>
  </div>
  <app-flights-list [workerId]="selectedWorkerId"></app-flights-list>
  `,
  styles: `
  div {
    border: 1px solid #000;
  }
  h3 {
    text-align: center;
    color: #fff;
    background-color: lightblue;
    padding: 10px;
  }`
})
export class WorkersListComponent {
  constructor(private workersService: WorkersService) { }
  
  selectedWorkerId : number | null = null;

  workers = signal<Worker[]>([]);

  selectedWorker : Worker | null = null;
 
  ngOnInit() {
    this.workersService.workersList().pipe(
      map((data: any) => data.map((item: any) => ({ id: item.id, name: item.name })))
    ).subscribe((workers: Worker[]) => {
      console.log(workers);
      this.workers = signal(workers);
      this.selectedWorker = this.workers()[0];
      this.selectedWorkerId = this.selectedWorker.id
    });
  }

  selectWorker(worker: Worker) {
    this.selectedWorker = worker;
    this.selectedWorkerId = this.selectedWorker.id
  }
}
