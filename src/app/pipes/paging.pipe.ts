import { Pipe, PipeTransform } from '@angular/core';
import { MOUser } from '../models';

@Pipe({
  name: 'pagingPipe',
})
export class PagingPipe implements PipeTransform {
  transform(
    users: MOUser[] = [],
    startingIndex: number,
    endIndex: number
  ): MOUser[] {
    if (!users) {

      return [];
    }
    return users.slice(startingIndex, endIndex);
  }
}
