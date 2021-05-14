import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { SongService } from '@app/song.service';
import { ToastrService } from 'ngx-toastr';

@Component({ selector: 'app-song-edit', templateUrl: './song-edit.component.html' })
export class SongEditComponent implements OnInit {
  constructor(
    public songService: SongService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.resetForm();
    }
    this.songService.formData = {
      id: '',
      artist: '',
      title: '',
      timeSignature: '',
      originalKey: ''
    };
  }

  onNewEntry() {
    this.resetForm();
    this.songService.editMode = false;
  }

  onSave(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (!form.value.id) {
      this.firestore.collection('songs').add(data);
      this.toastr.success('Added to database', `${data.artist} - ${data.title}`, {
        positionClass: 'toast-bottom-right'
      });
    } else {
      // On update, we do not want to alter the existing ID
      this.firestore.doc('songs/' + form.value.id).update(data);
      this.toastr.success('Changes saved', `${data.artist} - ${data.title}`, {
        positionClass: 'toast-bottom-right'
      });
    }
  }
}
