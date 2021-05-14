import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
  constructor(public auth: AngularFireAuth, private toastr: ToastrService) {}

  onLogout() {
    this.auth.signOut();
    this.toastr.success('', 'Successfully logged out', {
      positionClass: 'toast-bottom-right'
    });
  }

  onFooterVersion() {
    window.location.href = 'https://github.com/mwiraszka/Chordbomb#readme';
  }
}
