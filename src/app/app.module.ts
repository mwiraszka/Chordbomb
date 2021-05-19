import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { LoginModule } from './login/login.module';
import { NavComponent } from './nav/nav.component';
import { SongEditComponent } from './song-manager/song-edit/song-edit.component';
import { SongListComponent } from './song-manager/song-list/song-list.component';
import { SongManagerComponent } from './song-manager/song-manager.component';
import { SongSearchComponent } from './song-search/song-search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
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
    MatRadioModule,
    MatSidenavModule,
    appRoutingModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
