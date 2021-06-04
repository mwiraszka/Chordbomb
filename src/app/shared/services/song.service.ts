import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

import { Song } from '@app/shared/models/song.model';

@Injectable({ providedIn: 'root' })
export class SongService {
  private readonly _songToEdit$: BehaviorSubject<Song>;
  private readonly _songToDisplay$: BehaviorSubject<Song | null>;
  private readonly _isSongDisplay$: BehaviorSubject<boolean>;

  editMode: boolean;

  constructor(private firestore: AngularFirestore) {
    // Initialize song to be edited with default values declared in song.model class
    this.editMode = false;
    this._songToEdit$ = new BehaviorSubject<Song>(new Song());
    this._songToDisplay$ = new BehaviorSubject<Song | null>(null);
    this._isSongDisplay$ = new BehaviorSubject<boolean>(false);
  }

  /*
   * App State for Editing
   * (used to pass values between Song List & Song Edit components):
   * Pass private behavior subject through this public getter as an observable to ensure
   * writing privileges remain private to the service
   */
  get songToEdit(): Observable<Song> {
    return this._songToEdit$.asObservable();
  }

  changeSongToEdit(song: Song): void {
    this._songToEdit$.next(song);
  }

  /*
   * App State for Displaying
   * (used to pass values between Song Search & Song Display components):
   * Pass private behavior subject through this public getter as an observable to ensure
   * writing privileges remain private to the service
   */
  get songToDisplay(): Observable<Song | null> {
    return this._songToDisplay$.asObservable();
  }

  changeSongToDisplay(id: string) {
    this.firestore.collection('songs').doc(id)
      .valueChanges()
      .subscribe((songData) => {
        this._songToDisplay$.next(<Song>songData);
        this.setSongDisplay(true);
    });
  }

  get isSongDisplay(): Observable<boolean> {
    return this._isSongDisplay$.asObservable();
  }

  setSongDisplay(value: boolean) {
    this._isSongDisplay$.next(value);
  }

  /*
   * Firestore CRUD operations:
   * Create - addSong()
   * Read - getSongById(), getSongs()
   * Update - updateSong()
   * Delete - not available through this app to prevent accidental deletion
   */

  async addSong(newSong: Song): Promise<void> {
    const { id } = await this.firestore.collection('songs').add(newSong);
    // Wait until Firebase generates a new ID for the song, and store it as a parameter
    this.firestore.collection('songs').doc(id).update({ id: id });
  }

  getSongById(id: string): Observable<Song> {
    return this.firestore.doc(`songs/${id}`).valueChanges() as Observable<Song>;
  }

  getSongs() {
    return this.firestore.collection('songs').snapshotChanges();
  }

  updateSong(id: string, editedSong: Song): void {
    this.firestore.doc(`songs/${id}`).update(editedSong);
  }
}
