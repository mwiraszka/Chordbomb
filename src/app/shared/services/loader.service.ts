/* A simple service storing the current state of loading spinner to emit to subscribers */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  display(value: boolean): void {
    this.status.next(value);
  }
}
