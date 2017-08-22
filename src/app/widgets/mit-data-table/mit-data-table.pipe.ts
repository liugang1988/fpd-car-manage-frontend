import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mitDataTable'
})
export class MitDataTablePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
