import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Song } from '@app/shared/models/song.model';
import { SongService } from '@app/shared/services/song.service';
import { LoaderService } from '@app/shared/services/loader.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html'
})
export class SongListComponent implements OnInit, OnDestroy {
  /*
   * Subscribe to a list of all songs stored in the database and declare a Song-type
   * array (populated in ngOnInit lifecycle hook); initialize the currently-selected
   * song's ID as an empty string
   */
  private songListSub!: Subscription;
  songList!: Song[];
  currentSongId: string = '';

  constructor(
    private songService: SongService,
    private loaderService: LoaderService
  ) {
    this.loaderService.display(true);
  }

  ngOnInit() {
    this.songListSub = this.songService.getSongs$().subscribe((actionArray) => {
      this.songList = actionArray.map((item) => {
        return { ...(item.payload.doc.data() as object) } as Song;
      });
      this.loaderService.display(false);
    });
  }

  /* Unsubscribe to prevent memory leaks */
  ngOnDestroy() {
    this.songListSub.unsubscribe();
  }

  /*
   * When a song is clicked, first check ID against locally stored current song ID value
   * to ensure method is not being called needlessly when there is no song to change;
   * update currentSongId and switch editMode to true in Song Service
   */
  onSelect(song: Song) {
    if (this.currentSongId !== song.id) {
      this.songService.setSongToEdit(song);
      this.songService.editMode = true;
      this.currentSongId = song.id;
    }
  }
}
