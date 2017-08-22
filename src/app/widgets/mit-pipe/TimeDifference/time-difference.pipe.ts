import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'timeDifference'
})
export class TimeDifferencePipe implements PipeTransform {

  transform( time: any ): any {
    return Math.ceil( time / 60 ); // 向下取整
  }

}
