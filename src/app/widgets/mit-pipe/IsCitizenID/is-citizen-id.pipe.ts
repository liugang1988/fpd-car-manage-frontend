import { Pipe, PipeTransform } from '@angular/core';


@Pipe( {
  name: 'IsCitizenID '
})
export class IsCitizenIDPipe implements PipeTransform {
  /**中国民众身份证*/
  transform( value: any, args?: any ): boolean {
    return /([0-9]){7,18}(x|X)?/.test( value );
  }
}

