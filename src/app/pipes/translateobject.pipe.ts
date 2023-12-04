import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateobject'
})
export class TranslateobjectPipe implements PipeTransform {

  transform(value: any,prop:string,lang:string): any {
    if(value==null) return null;
    let result='';
    Object.keys(value).forEach((key:string) => {
      if(key.toLowerCase()==prop.toLowerCase()+lang.toLowerCase())
      result=value[key]
    });
    return result;
  }

}