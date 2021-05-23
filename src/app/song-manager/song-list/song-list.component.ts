import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Song } from '../../shared/song.model';
import { SongService } from '../../shared/song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnDestroy {
  songList!: Song[];
  private songListSub: Subscription;

  constructor(private songService: SongService) {
    this.songListSub = this.songService.getSongs().subscribe((actionArray) => {
      this.songList = actionArray.map((item) => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as object)
        } as Song;
      });
    });
  }

  ngOnDestroy() {
    this.songListSub.unsubscribe();
  }

  onSelect(song: Song) {
    this.songService.selectSong(song);
    this.songService.editMode = true;
  }
}
