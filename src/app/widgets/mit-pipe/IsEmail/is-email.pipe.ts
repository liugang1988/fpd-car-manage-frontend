import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'IsEmail'
})
export class IsEmailPipe implements PipeTransform {

  transform( value: any, args?: any ): boolean {
    return /\w+([-+.]\w+)?@\w+([-.]\w+).\w+([-.]\w+)*$/.test( value );
  }
}
