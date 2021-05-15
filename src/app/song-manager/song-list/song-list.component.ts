import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Song } from '@app/_models/song.model';
import { SongService } from '@app/_services/song.service';

@Component({ selector: 'app-song-list', templateUrl: './song-list.component.html' })
export class SongListComponent implements OnDestroy {
  songList!: Song[];
  songListSub!: Subscription;

  constructor(private songService: SongService) {
    this.songListSub = this.songService.getSongs().subscribe((actionArray) => {
      this.songList = actionArray.map((item) => {
        return {
          id: item.payload.doc.id, ...(item.payload.doc.data() as object)
        } as Song;
      });
    });
  }

  ngOnDestroy() {
    this.songListSub.unsubscribe();
  }

  onSelect(song: Song) {
    this.songService.updateSelectedSong(song);
    this.songService.editMode = true;
  }
}
