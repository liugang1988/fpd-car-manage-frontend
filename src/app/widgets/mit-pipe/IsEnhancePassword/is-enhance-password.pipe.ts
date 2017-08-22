import { Pipe, PipeTransform } from '@angular/core';


@Pipe( {
  name: 'IsEnhancePassword'
})
export class IsEnhancePasswordPipe implements PipeTransform {
  /**必须含有大小写字母,数字及特殊符号,长度8~24 */
  transform( value: any, args?: any ): boolean {
    return /^(?!\s)((?=.*[a-zA-Z])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).\S{8,24})$/.test( value );
  }
}
