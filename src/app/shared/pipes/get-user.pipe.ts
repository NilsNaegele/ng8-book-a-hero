import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getUser'
})
export class GetUserPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
