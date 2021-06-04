import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly _fontSize$: BehaviorSubject<string>;
  private readonly _chordType$: BehaviorSubject<string>;
  private readonly _sidenavToggle$: Subject<null>;

  constructor() {
    // Initialize state of app settings
    this._fontSize$ = new BehaviorSubject<string>('regular');
    this._chordType$ = new BehaviorSubject<string>('full');
    this._sidenavToggle$ = new Subject();
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

  get sidenavStatus(): Observable<{}> {
    return this._sidenavToggle$.asObservable();
  }
  toggleSidenav(): void {
    this._sidenavToggle$.next();
  }
}
