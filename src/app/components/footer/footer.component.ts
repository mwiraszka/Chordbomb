import { Component } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <small id="copyright" class="footer-text">
        {{ currentYear }} &copy; Michal Wiraszka
      </small>
      <address id="github-repo" class="bigger">
        <a href="https://github.com/mwiraszka/Chordbomb#readme" id="about-chordbomb">
          About Chordbomb
          <fa-icon [icon]="faGithub" class="fa-lg" id="github-icon"></fa-icon>
        </a>
      </address>
    </footer>
  `
})
export class FooterComponent {
  faGithub = faGithub;
  currentYear = new Date().getFullYear();
}
