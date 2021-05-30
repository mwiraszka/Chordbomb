import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { SongService } from '@app/shared/services/song.service';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.scss']
})
export class SongSearchComponent implements AfterViewInit, OnDestroy {
  faCog = faCog;

  fontSize: string = 'regular';
  chordType: string = 'full';
  fontSizes: string[] = ['regular', 'large'];
  chordTypes: string[] = ['full', 'basic', 'none'];

  constructor(private songService: SongService) {}

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  onKeyUp($event: any) {
    const value = $event.target.value;
    console.log(`input: %c${value}`, 'color: red;');
  }
}
