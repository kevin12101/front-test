import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg?: any): any {
    const result = [];
    if(arg == "") return value

    for(const item of value){

      if(item.full_name.toLowerCase().indexOf(arg.toLowerCase())> -1 ){
        result.push(item)
      }
      else if(item.id == (arg)){
        result.push(item)
      }else if(item.description.toLowerCase().indexOf(arg.toLowerCase())> -1 ){
        result.push(item)
      }
    } 
    return result;
  }

}
