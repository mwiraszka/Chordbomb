import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  menuOpen = false;
  userCog = faUserCog;

  constructor(public auth: AngularFireAuth, private toastr: ToastrService) {}

  closeDropdownMenu() {
    this.menuOpen = false;
    document.getElementById('top-nav')?.classList.remove('open');
  }

  toggleDropdownMenu() {
    this.menuOpen = !this.menuOpen;
    let topNav = document.getElementById('top-nav');
    this.menuOpen ? topNav?.classList.add('open') : topNav?.classList.remove('open');
  }

  onLogout() {
    this.auth.signOut();
    this.toastr.success('', 'Successfully logged out', {
      positionClass: 'toast-bottom-right'
    });
    this.closeDropdownMenu();
  }
}
