import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizefirst'
})
export class CapitalizefirstPipe implements PipeTransform {

  transform(room: string, args: any[]): string {
    if (room === null) return 'Not assigned';
    return room.charAt(0).toUpperCase() + room.slice(1);
  }
}
