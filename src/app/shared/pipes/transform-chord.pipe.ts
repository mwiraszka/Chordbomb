/* Transform chord string based on chord type provided ('none', 'full', or 'basic') */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'transformChord' })
export class TransformChordPipe implements PipeTransform {
  transform(chordStr: string, chordType: string): string {
    /*
     * If chordType is set to 'none', or chord is an empty string or 's' for silence,
     * return an empty string right away
     */
    if (chordType === 'none' || chordStr === '' || chordStr === 's') {
      return '';
    }

    /*
     * Replace #'s with proper musical sharp symbols and M's with 'maj'; replace b's with
     * proper musical flat symbol - ensure it's not meant to be the letter 'b' by checking
     * if the previous character is a letter or 7 (the only times a flat would be present)
     */
    chordStr = chordStr.replace(/#/g, '♯');
    chordStr = chordStr.replace(/M/g, 'maj');
    for (let i = 1; i < chordStr.length; i++) {
      if (chordStr.charAt(i) === 'b' && chordStr.charAt(i-1).match(/[a-gA-G7]/)) {
        chordStr = chordStr.substring(0, i) + '♭' + chordStr.substring(i+1);
      }
    }

    /*
     * If chord type is set to 'full', standard open 5th notation will be maintained, so
     * capitalize letter; all transformation for 'full' chord now complete - return */
    if (chordType === 'full') {
      if (chordStr.slice(-1)[0]==='5' && chordStr.length < 4) {
        chordStr = chordStr.toUpperCase();
      }
      return chordStr;
    }

    /* Chord type must be set to 'basic': return the chord if already in a basic form */
    if (
      (chordStr.length === 1) ||
      (chordStr.length === 2 && chordStr.slice(-1)[0].match(/[♯♭]/))
    ) {
      return chordStr;
    }

    /* Simplify chord by stripping all after the first 'advanced' chord character found */
    return chordStr.slice(0, chordStr.search(/[5679(sm\/]/));
  };
}
