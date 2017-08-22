import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'vehicleSelect'
})
export class VehicleSelectPipe implements PipeTransform {

  transform( arr: Array<any>, keyword?: string, type?: string ): any {
    if ( keyword ) {
      return this.search( arr, keyword, type );
    } else {
      return arr;
    }
  }

  search( arr, keyword, type ) {
    const _arr = [];
    arr.forEach(( item ) => {
      switch ( type ) {
        case 'brand':
          if ( item.BrandName.indexOf( keyword ) > -1 ) {
            _arr.push( item );
          }
          break;
        case 'line':
          if ( item.LineName.indexOf( keyword ) > -1 ) {
            _arr.push( item );
          }
          break;
        case 'model':
          if ( item.ModelName.indexOf( keyword ) > -1 ) {
            _arr.push( item );
          }
          break;
        default:
      }
    });
    return _arr;
  }
}
