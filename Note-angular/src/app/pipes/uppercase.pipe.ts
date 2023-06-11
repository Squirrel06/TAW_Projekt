import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercase'
})
export class UppercasePipe implements PipeTransform {

  transform(value: string | undefined): any {
    if (!value){
      return null;
    }
    return value.toUpperCase();
  }

}
