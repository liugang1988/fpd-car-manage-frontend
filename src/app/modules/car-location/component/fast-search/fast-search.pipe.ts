import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'fastSearch'
})
export class FastSearchPipe implements PipeTransform {

  transform( args?: any, value?: any ): any {
    if ( value ) {
      const _arr = [];
      args.forEach(( item, key ) => {
        if ( item.Plate && item.Plate.indexOf( value.toUpperCase() ) > -1 ) {
          _arr.push( item );
        }
      });
      return _arr;
    }
  }

}
