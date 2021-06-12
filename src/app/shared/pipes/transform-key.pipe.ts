/* Replace the 2nd character with the proper musical symbol if it's a flat or sharp */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'transformKey' })
export class TransformKeyPipe implements PipeTransform {
  transform(key: string): string {
    return key.charAt(1)==='#' ? (key.charAt(0) + '♯' + key.substring(2)) :
           key.charAt(1)==='b' ? (key.charAt(0) + '♭' + key.substring(2)) :
                                 key;
  };
}
