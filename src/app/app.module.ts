import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxAbstractControlAsModule } from 'ngx-abstract-control-as';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginModule } from './login/login.module';
import { NavComponent } from './nav/nav.component';
import { SongEditComponent } from './song-manager/song-edit/song-edit.component';
import { SongListComponent } from './song-manager/song-list/song-list.component';
import { SongManagerComponent } from './song-manager/song-manager.component';
import { SongSearchComponent } from './song-search/song-search.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    SongEditComponent,
    SongListComponent,
    SongManagerComponent,
    SongSearchComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    appRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    LoginModule,
    MatRadioModule,
    MatSidenavModule,
    NgxAbstractControlAsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
