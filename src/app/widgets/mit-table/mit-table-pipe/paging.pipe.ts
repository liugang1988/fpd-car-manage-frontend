import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paging',
  pure: false
})
export class PagingPipe implements PipeTransform {

  transform(array: any, currentPage?: any, pageSize?: any): any {
    return _.slice(array, currentPage * pageSize - pageSize, currentPage * pageSize);
  }

}
