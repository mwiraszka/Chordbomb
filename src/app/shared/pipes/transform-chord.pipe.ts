/*
 * Transform chord based on chord type provided:
 * Case 'none': return empty string;
 * Case 'basic': first check to see if chord is a single letter, or one with a sharp or
 *    flat trailing - i.e. a simple triad. If so, return original chord as no
 *    transformations will be necessary. If not, transform the chord by removing any
 *    advanced chord characters in turn: '/' (chord inversion), '7' or '9' (7th or 9th
 *    chord), 'M' (Major - used only for Major 7th or Major 9th chords), and 'sus2' or
 *    'sus4' (suspensions); return transformed chord
 * Case 'full' or default (as fail-safe): return full chord without any change.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'transformChord' })
export class TransformChordPipe implements PipeTransform {

  transform(fullChord: string, chordType: string): string {
    switch(chordType) {
      case('none'):
        return '';
      case('basic'):
        if (
          (fullChord.length === 1) ||
          (fullChord.length === 2 && (fullChord.endsWith('#') || fullChord.endsWith('b')))
        ) {
          return fullChord;
        }

        let transformedChord = fullChord;
        if (transformedChord.search('/') !== -1) {
          transformedChord = transformedChord.slice(0, transformedChord.indexOf('/'));
        }
        if (transformedChord.endsWith('7') || transformedChord.endsWith('9')) {
          transformedChord = transformedChord.slice(0, -1);
        }
        if (transformedChord.endsWith('M')) {
          transformedChord = transformedChord.slice(0, -1);
        }
        if (transformedChord.search('sus') !== -1) {
          transformedChord = transformedChord.slice(0, transformedChord.indexOf('sus'));
        }
        return transformedChord;
      case('full'):  // Fall through
      default:
        return fullChord;
    }
  }

}
