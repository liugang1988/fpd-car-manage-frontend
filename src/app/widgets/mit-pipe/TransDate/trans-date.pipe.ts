import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe( {
  name: 'transDate'
})
export class TransDatePipe implements PipeTransform {

  transform( value: any ): any {
    if ( value && typeof value === 'string' ) {
      const d = new Date( value );
      const time = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
      return time;
    } else if ( value && value.year && value.month && value.day ) {
      const d = value.year + '/' + value.month + '/' + value.day;
      return new Date( d );
    }

    return '';
  }

}
