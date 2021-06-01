import { Component } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  faCog = faCog;

  fontSize: string = 'regular';
  chordType: string = 'full';
  fontSizes: string[] = ['regular', 'large'];
  chordTypes: string[] = ['full', 'basic', 'none'];

  constructor() {}
}
