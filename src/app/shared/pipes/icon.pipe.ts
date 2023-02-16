import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case 'Paulo': return 'code';
      case 'João': return 'computer';
    }
    return '';
  }

}
