import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  static orderByComparator(a: any, b: any): number {
    if (parseFloat(a) < parseFloat(b)) {
      return - 1;
    }
    if (parseFloat(a) > parseFloat(b)) {
      return 1;
    }
  }

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
