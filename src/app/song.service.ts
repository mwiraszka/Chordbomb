import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Song } from '@app/song.model';

@Injectable({ providedIn: 'root' })
export class SongService {
  formData!: Song;
  editMode = false;

  constructor(private firestore: AngularFirestore) {}

  getSongs() {
    return this.firestore.collection('songs').snapshotChanges();
  }
}
