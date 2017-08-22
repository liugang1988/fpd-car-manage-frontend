import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectArr'
})
export class SelectPipe implements PipeTransform {

  transform(args?: any, value?: any, optionName?:any): any {
    if (args && args.length && value && optionName) {
      const _arr = [];
      args.forEach(( item, key ) => {
        if ( item[optionName] && item[optionName].indexOf( value ) > -1 ) {
          _arr.push( item );
        }
      });
      return _arr;
    } else {
      return args;
    }
  }

}
