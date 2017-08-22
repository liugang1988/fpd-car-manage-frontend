import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'getName'
})
export class GetNamePipe implements PipeTransform {
  transform( value: any, arr:Array<any> ): any {
    let name;
    arr.forEach((item,index) => {
        if(value == arr[index].id){
            name = arr[index].name
        }
    })
    return name;
  }
}
