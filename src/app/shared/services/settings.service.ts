import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly _fontSize$: BehaviorSubject<string>;
  private readonly _chordType$: BehaviorSubject<string>;

  private _openSidenav$ = new Subject<void>();
  openSidenav$ = this._openSidenav$.asObservable()

  constructor() {
    // Initialize state of app settings
    this._fontSize$ = new BehaviorSubject<string>('regular');
    this._chordType$ = new BehaviorSubject<string>('full');
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

  openSidenav(): void {
    this._openSidenav$.next();
  }
}
