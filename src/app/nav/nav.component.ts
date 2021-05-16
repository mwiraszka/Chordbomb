import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(public auth: AngularFireAuth, private toastr: ToastrService) {}
  menuClicked = false;
  onLogout() {
    this.auth.signOut();
    this.toastr.success('', 'Successfully logged out', {
      positionClass: 'toast-bottom-right'
    });
  }
}
