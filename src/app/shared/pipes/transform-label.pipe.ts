/*
 * Transform label:
 * Simply output the text (Verse 1, Chorus 1, etc.) unless it's an internal flag, not
 * not meant to be displayed
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'transformLabel' })
export class TransformLabelPipe implements PipeTransform {
  transform(label: string): string {
    return (label==='e' || label==='ef' || label==='n') ? '' : label;
  };
}
