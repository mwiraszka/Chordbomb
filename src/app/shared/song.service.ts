import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

import { Song } from './song.model';

@Injectable({ providedIn: 'root' })
export class SongService {
  private readonly _songToEdit$: BehaviorSubject<Song>;
  editMode: boolean;

  constructor(private firestore: AngularFirestore) {
    // Initialize song to be edited with default values declared in song.model class
    this._songToEdit$ = new BehaviorSubject<Song>(new Song());
    this.editMode = false;
  }

  // In-app state: the song the user selected in song list
  get songToEdit(): Observable<Song> {
    return this._songToEdit$.asObservable();
  }

  changeSongToEdit(song: Song): void {
    this._songToEdit$.next(song);
  }

  // Database state: CRUD for the songs stored in Firestore
  getSongs() {
    return this.firestore.collection('songs').snapshotChanges();
  }

  addSong(newSong: Song): void {
    this.firestore.collection('songs').add(newSong);
  }

  updateSong(id: string, updatedSong: Song) {
    this.firestore.doc(`songs/${id}`).update(updatedSong);
  }
}
