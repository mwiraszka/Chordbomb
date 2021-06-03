import { Component } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <small id="copyright"> &copy; 2021 Copyright: Michal Wiraszka </small>
      <small id="version">
        Currently in development (version 0.5.0)
      </small>
      <address id="github-repo" class="bigger">
        <a href="https://github.com/mwiraszka/Chordbomb#readme" id="about-chordbomb">
          About Chordbomb
          <fa-icon [icon]="faGithub" class="fa-lg" id="github-icon"></fa-icon>
        </a>
      </address>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  faGithub = faGithub;
}
