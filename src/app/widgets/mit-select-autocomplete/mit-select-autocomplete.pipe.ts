import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'mitSelectAutocomplete'
})
export class MitSelectAutocompletePipe implements PipeTransform {
  transform( args?: any, value?: any ): any {
    if ( value ) {
      const _arr = [];
      args.forEach(( item, key ) => {
        if ( item.name.indexOf( value ) > -1 ) {
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
