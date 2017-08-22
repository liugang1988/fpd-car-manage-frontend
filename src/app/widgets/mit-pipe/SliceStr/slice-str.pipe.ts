import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'SliceStr'
})
export class SliceStrPipe implements PipeTransform {
  /**
    * 截图字符串字符
    * option(start,end,[+str])
    */
  transform(value: string, start?: number, end?: number, extraStr?: string): string {
    if (value) {
      if (typeof (start) === 'number' && typeof (end) === 'number') {
        if (value.length > end && extraStr && typeof (extraStr) === 'string') {
          return value.slice(start, end) + extraStr.toString();
        } else {
          return value.slice(start, end);
        }

      } else {
        return value;
      }
    } else {
      return value;
    }

  }
}
