import { Pipe, PipeTransform } from '@angular/core';



@Pipe( {
  name: 'IsNormalPassword'
})
export class IsNormalPasswordPipe implements PipeTransform {
  /**只能输入由数字、26个英文字母或者下划线组成的字符串,长度8~16 */
  transform( value: any, args?: any ): boolean {
    return /^\w{8,16}$/.test( value );
  }
}
