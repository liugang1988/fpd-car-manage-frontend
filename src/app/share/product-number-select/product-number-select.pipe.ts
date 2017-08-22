import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'productNumberSelect'
})
export class ProductNumberSelectPipe implements PipeTransform {

  transform( args?: any, value?: any ): any {
    if ( args.length && value ) {
      const _arr = [];
      args.forEach(( item, key ) => {
        if ( item.SuppliersName && item.SuppliersName.indexOf( value ) > -1 ) {
          _arr.push( item );
        }
      });
      return _arr;
    } else {
      return args;
    }
  }

}
