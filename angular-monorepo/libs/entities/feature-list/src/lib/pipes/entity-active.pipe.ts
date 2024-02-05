import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entityActive',
})
export class EntityActivePipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Active' : 'Inactive';
  }
}
