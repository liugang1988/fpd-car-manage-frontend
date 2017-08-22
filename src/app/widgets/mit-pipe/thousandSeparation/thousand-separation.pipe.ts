import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'thousandSeparation'
})
export class ThousandSeparationPipe implements PipeTransform {

  transform( value: any, args?: any ): any {
    if ( value ) {
      return value.toString().replace( /^\d+/g, ( m ) => m.replace( /(?=(?!^)(\d{3})+$)/g, ',' ) );
    } else {
      return 0;
    }
  }

}
