import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { faUserCog, faCog } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { SongService } from '@app/shared/services/song.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {
  menuOpen = false;
  userCog = faUserCog;
  faCog = faCog;

  constructor(
    public auth: AngularFireAuth,
    private songService: SongService,
    private toastr: ToastrService
  ) {}

  closeDropdownMenu() {
    this.menuOpen = false;
    document.getElementById('app-nav')?.classList.remove('open');
  }

  toggleDropdownMenu() {
    this.menuOpen = !this.menuOpen;
    let topNav = document.getElementById('app-nav');
    this.menuOpen ? topNav?.classList.add('open') : topNav?.classList.remove('open');
  }

  onSongSearch() {
    this.closeDropdownMenu();
    this.songService.setSongToDisplay(false);
  }

  onSongManager() {
    this.closeDropdownMenu();
  }

  onAdminLogin() {
    this.closeDropdownMenu();
  }

  onLogout() {
    this.auth.signOut();
    this.toastr.success('', 'Successfully logged out', {
      positionClass: 'toast-bottom-right'
    });
    this.closeDropdownMenu();
  }
}
