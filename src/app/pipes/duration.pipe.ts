import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    if (!value) return "";

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;

    return `${minutes}m`;
  }

}
