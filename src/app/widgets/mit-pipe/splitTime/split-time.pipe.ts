import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitTime'
})
export class SplitTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value){
      return value.indexOf('T') > -1 ? value.split('T')[0] : value.split(' ')[0];
    }else {
      return '';
    }
  }

}
