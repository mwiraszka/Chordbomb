import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  /*
   * Emit void 'trigger' value to subscriber in Dashboard (where sidenav opens) whenever
   * openSidenav() method is called
   */
  private _openSidenav$ = new Subject<void>();
  openSidenav$ = this._openSidenav$.asObservable();

  openSidenav(): void {
    this._openSidenav$.next();
  }
}
