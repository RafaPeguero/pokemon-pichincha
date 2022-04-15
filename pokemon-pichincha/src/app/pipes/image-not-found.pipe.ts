import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageNotFound'
})
export class ImageNotFoundPipe implements PipeTransform {

  transform(value: string): string {
    if(value?.length > 0 ) {
      return value;
    } 
    return '/assets/image-not-found.png';
  }

}
