import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectCounter'
})
export class ObjectCounterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (value) ? Object.keys(value).length : 0;
  }

}
