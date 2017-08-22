import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'IsMobilePhone'
})
export class IsMobilePhonePipe implements PipeTransform {
  /**
   * 匹配了手机带前缀或者带前缀加横杠
   */
  transform( value: any, args?: any ): any {
    return /^(0|86|17951)?(-)?^1[3,5,7,8,9]\d{9}$/.test( value );
  }
}
