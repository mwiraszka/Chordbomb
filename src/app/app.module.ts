import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '@app/app.component';
import { appRoutingModule } from '@app/app.routing';
import { LoginModule } from '@app/login/login.module';
import { SongEditComponent } from '@app/song-manager/song-edit/song-edit.component';
import { SongListComponent } from '@app/song-manager/song-list/song-list.component';
import { SongManagerComponent } from '@app/song-manager/song-manager.component';
import { SongSearchComponent } from '@app/song-search/song-search.component';
import { environment } from '@environments/environment';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    SongManagerComponent,
    SongEditComponent,
    SongListComponent,
    SongSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    FormsModule,
    ReactiveFormsModule,
    appRoutingModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
