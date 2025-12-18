import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aprovado',
})
export class AprovadoPipe implements PipeTransform {

  transform(status: boolean): string {
    return status ? '🟢' : '🔴';
  }

}
