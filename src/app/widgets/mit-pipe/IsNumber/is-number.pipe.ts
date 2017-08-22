import { Pipe, PipeTransform } from '@angular/core';


@Pipe( {
  name: 'IsNumber'
})
export class IsNumberPipe implements PipeTransform {
  /**支持正整数及小数*/
  transform( value: any, args?: any ): boolean {
    return /\d+(\.?)\d{0,6}/.test( value );
  }
}
