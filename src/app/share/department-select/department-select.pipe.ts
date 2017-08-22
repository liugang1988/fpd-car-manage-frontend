import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'departmentSelect'
})
export class DepartmentSelectPipe implements PipeTransform {
  _arr = [];
  transform( args?: any, value?: any ): any {
    if ( args && value && value.length ) {
      const _arr = args;
      this._arr = [];
      const arr = this.each( args, value );
      return arr;
    } else {
      return args;
    }
  }

  each( arr, value ) {
    arr.forEach(( item, key ) => {
      if ( item.DepartmentName && item.DepartmentName.indexOf( value ) > -1 ) {
        item.SubDepts = null;
        this._arr.push( item );
      }
      if ( item.SubDepts ) {
        this.each( item.SubDepts, value );
      }
    });
    return this._arr;
  }
}
