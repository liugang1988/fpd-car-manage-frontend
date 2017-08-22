import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mitTimePicker'
})
export class MitTimePickerPipe implements PipeTransform {

  transform(arr: Array<string>, minTime?: string): any {

    if (minTime) {
      const _t = minTime.split(':')[0];
      return arr.filter((e) => {
        return _t <= e;
      });
    } else {

      return arr;
    }
  }

}
