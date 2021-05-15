import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

import { Song } from '@app/_models/song.model';

@Injectable({ providedIn: 'root' })
export class SongService {
  editMode = false;
  private selectedSong = new BehaviorSubject<Song>(new Song());

  constructor(private firestore: AngularFirestore) {}

  getSelectedSong() {
    return this.selectedSong.asObservable();
  }

  updateSelectedSong(song: Song) {
    this.selectedSong.next(song);
  }

  clearSelectedSong() {
    this.selectedSong.next(new Song());
  }

  getSongs() {
    return this.firestore.collection('songs').snapshotChanges();
  }

  addSong(song: Song) {
    this.firestore.collection('songs').add(song);
  }

  updateSong(id: string, updatedSong: Song) {
    this.firestore.doc(`songs/${id}`).update(updatedSong);
  }
}
