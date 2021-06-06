import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  /* Initialize app settings, and getters that return these values as observables */
  private _fontSize$ = new BehaviorSubject<string>('regular');
  private _chordType$ = new BehaviorSubject<string>('full');

  fontSize$ = this._fontSize$.asObservable();
  chordType$ = this._chordType$.asObservable();

  /* Setter functions that push a new value for behavior subjects to emit */
  setFontSize(newFontSize: string): void {
    this._fontSize$.next(newFontSize);
  }

  setChordType(newChordType: string): void {
    this._chordType$.next(newChordType);
  }
}
