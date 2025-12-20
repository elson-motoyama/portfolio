import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aprovado',
})
export class AprovadoPipe implements PipeTransform {
  transform = (aprovado: boolean): string => aprovado ? '🟢' : '🔴';
}
