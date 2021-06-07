/*
 * Truncate text to given amount of characters;
 * optional - include '...' in the character count 2nd argument ellipsis passed in as true
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number, ellipsis?: boolean): string {
    return value.length < limit ? value :
                       ellipsis ? value.slice(0, limit - 3) + '...' :
                                  value.slice(0, limit);
  };
}
