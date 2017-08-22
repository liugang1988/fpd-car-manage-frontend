import { Pipe, PipeTransform } from '@angular/core';


@Pipe( {
  name: 'IsUsername'
})
export class IsUsernamePipe implements PipeTransform {
  /**
   * 匹配了手机带前缀或者带前缀加横杠
   */
  transform( value: any, args?: any ): any {

    if ( /^(0|86|17951)?(-)?^1[3,5,7,8,9]\d{9}$/.test( value ) || /\w+([-+.]\w+)?@\w+([-.]\w+).\w+([-.]\w+)*$/.test( value ) ) {
      return true;
    } else {
      return false;
    }
  }
}
