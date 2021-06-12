/*
 * Transform lyric:
 * If final character is a hyphen, word is multisyllabic and not yet complete, so remove
 * the hyphen; otherwise it must be the end of a word, so add a trailing space
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'transformLyric' })
export class TransformLyricPipe implements PipeTransform {
  transform(lyric: string): string {
    return lyric.endsWith('-') ? lyric.slice(0, -1) : lyric;
  };
}
