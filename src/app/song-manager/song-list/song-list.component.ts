import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Song } from '@app/song.model';
import { SongService } from '@app/song.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html'
})
export class SongListComponent implements OnInit {
  songList: Song[] = [];
  constructor(
    private songService: SongService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.songService.getSongs().subscribe((actionArray) => {
      this.songList = actionArray.map((item) => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as object)
        } as Song;
      });
    });
  }

  onEdit(song: Song) {
    this.songService.formData = Object.assign({}, song);
    this.songService.editMode = true;
  }
}
