import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Song } from '@app/shared/models/song.model';

@Injectable({ providedIn: 'root' })
export class SongService {
  /*
   * Store song to be edited & song to be displayed as private behavior subjects, which
   * emit changes to subscribers in Song Manager & Dashboard components through public
   * 'getter' observables; this keeps the behavior subjects' write privileges private
   *
   * Initialize songToEdit$ with default values declared in song.model class, and
   * songToDisplay$ as null; editMode stores whether user is adding a new song or editing
   * an existing one in the Song Manager component - defaults to 'add mode'
   */
  private _songToEdit$ = new BehaviorSubject<Song>(new Song());
  private _songToDisplay$ = new BehaviorSubject<Song | null>(null);
  songToEdit$ = this._songToEdit$.asObservable();
  songToDisplay$ = this._songToDisplay$.asObservable();
  editMode = false;

  /* Inject instance of Firestore, which acts as the main entry point to the database */
  constructor(private firestore: AngularFirestore) {}

  /* Set song to edit by pushing new value for behavior subject to emit to subscribers */
  setSongToEdit(song: Song): void {
    this._songToEdit$.next(song);
  }

  /*
   * Set song to display by retrieving song data from Firestore using passed in ID;
   * take(1) to ensure subscription is discarded after the song has been passed
   */
  setSongToDisplay(id: string): void {
    this.firestore.collection('songs').doc(id).valueChanges().pipe(take(1))
      .subscribe((song) => {
        this._songToDisplay$.next(<Song>song);
    });
  }

  /* Remove song by emitting 'null' value to all subscribers */
  removeSongToDisplay(): void {
    this._songToDisplay$.next(null);
  }

  /*
   * Firestore CRUD operations:
   * Create - addSong()
   * Read - getSongById(), getSongs()
   * Update - updateSong()
   * Delete - not available through this app to prevent accidental deletion
   */
  async addSong(newSong: Song, timestamp: string): Promise<void> {
    const { id } = await this.firestore.collection('songs').add(newSong);
    // Wait until Firebase generates a new ID for the song, and store it as a parameter
    this.firestore.collection('songs').doc(id).update({ id: id });
    this.firestore.collection('backups').doc(`${id} - ${timestamp}`).set(newSong);
  }

  getSongById$(id: string): Observable<Song> {
    return this.firestore.doc(`songs/${id}`).valueChanges() as Observable<Song>;
  }

  getSongs$() {
    return this.firestore.collection('songs').snapshotChanges();
  }

  updateSong(id: string, editedSong: Song, timestamp: string): void {
    this.firestore.doc(`songs/${id}`).update(editedSong);
    this.firestore.collection('backups').doc(`${id} - ${timestamp}`).set(editedSong);
  }
}
