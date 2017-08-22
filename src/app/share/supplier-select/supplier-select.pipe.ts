import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'supplierSelect'
})
export class SupplierSelectPipe implements PipeTransform {
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


export function escapeRegexp( queryToEscape: string ): string {
  return queryToEscape.replace( /([.?*+^$[\]\\(){}|-])/g, '\\$1' );
}
