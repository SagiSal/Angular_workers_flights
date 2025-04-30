import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Worker } from '../../models/worker.model';

@Component({
  selector: 'app-worker',
  standalone: true,
  imports: [],
  template: `
    <li
      (click)="onClick()"
      [style.background]="isSelected ? 'lightgrey' : 'white'"
      >
      {{ worker.name }}
    </li>
  `,
  styles: `
  li {
    list-style: none;
    text-align: left;
    cursor: pointer; 
    margin-right: 15px;
  }`
})
export class WorkerComponent {
  @Input() worker!: Worker;
  @Input() isSelected: boolean = false;
  @Output() workerClicked = new EventEmitter<Worker>();

  onClick() {
    this.workerClicked.emit(this.worker);
  }
}
