import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly _fontSize$: BehaviorSubject<string>;
  private readonly _chordType$: BehaviorSubject<string>;
  private readonly _isSidenavOpen$: BehaviorSubject<boolean>;

  constructor() {
    // Initialize state of app settings
    this._fontSize$ = new BehaviorSubject<string>('regular');
    this._chordType$ = new BehaviorSubject<string>('full');
    this._isSidenavOpen$ = new BehaviorSubject<boolean>(false);
  }

  get fontSize(): Observable<string> {
    return this._fontSize$.asObservable();
  }

  changeFontSize(newFontSize: string): void {
    this._fontSize$.next(newFontSize);
  }

  get chordType(): Observable<string> {
    return this._chordType$.asObservable();
  }

  changeChordType(newChordType: string): void {
    this._chordType$.next(newChordType);
  }

  get isSidenavOpen(): Observable<boolean> {
    return this._isSidenavOpen$.asObservable();
  }

  toggleSidenav(): void {
    this._isSidenavOpen$.next(!this._isSidenavOpen$.value);
  }
}
