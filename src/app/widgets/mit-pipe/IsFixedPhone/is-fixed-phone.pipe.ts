import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'IsFixedPhone'
})
export class IsFixedPhonePipe implements PipeTransform {
  /**固话:XXXX-XXXXXXX*/
  transform( value: any, args?: any ): boolean {
    return /(\d{4}-|\d{3}-)?(\d{8}|\d{7})/.test( value );
  }
}
