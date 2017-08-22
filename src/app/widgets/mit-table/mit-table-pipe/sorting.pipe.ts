import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sorting',
    pure: false
})
export class SortingPipe implements PipeTransform {

    transform(array: any, sortingFlag: any, orderFlag): any {
        if (sortingFlag) {
            return _.orderBy(array, [sortingFlag], [orderFlag]);
        } else {
            return array;
        }
    }

}
