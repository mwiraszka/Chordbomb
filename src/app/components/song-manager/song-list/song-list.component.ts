import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Song } from '@app/shared/models/song.model';
import { SongService } from '@app/shared/services/song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit, OnDestroy {
  songList!: Song[];
  private songListSub: Subscription;

  currentSongId: string = '';

  constructor(private songService: SongService) {}

  ngOnInit() {
    this.songListSub = this.songService.getSongs().subscribe((actionArray) => {
      this.songList = actionArray.map((item) => {
        return { ...(item.payload.doc.data() as object) } as Song;
      });
    });
  }

  ngOnDestroy() {
    this.songListSub.unsubscribe();
  }

  onSelect(song: Song) {
    if (this.currentSongId !== song.id || !this.songService.editMode) {
      this.songService.changeSongToEdit(song);
      this.songService.editMode = true;
      // Keep a record of the current song ID to prevent this method from being called
      // needlessly when song wouldn't change anyway
      this.currentSongId = song.id;
    }
  }
}
