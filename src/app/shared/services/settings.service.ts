import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  /*
   * Initialize app settings as private behavior subjects, with public setter methods to
   * emit new values, and getters that return observables to these values
   */
  private _fontSize$ = new BehaviorSubject<string>('regular');
  private _chordType$ = new BehaviorSubject<string>('full');

  fontSize$ = this._fontSize$.asObservable();
  chordType$ = this._chordType$.asObservable();

  setFontSize(newFontSize: string): void {
    this._fontSize$.next(newFontSize);
  }

  setChordType(newChordType: string): void {
    this._chordType$.next(newChordType);
  }
}
