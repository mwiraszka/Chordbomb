import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { LoaderService } from '@app/shared/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private loaderService: LoaderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
    document.getElementById('nav-settings-btn')?.classList.add('hide');
  }

  onKeyUp(event: any): void {
    console.log('key')
    if (event.keyCode === 13) {
      console.log('13')
      this.onLogin();
    }
  }

  onLogin() {
    this.loaderService.display(true);
    const { email, password } = this.loginForm.value;
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['']);
        this.toastr.success('', 'Successfully logged in', {
          positionClass: 'toast-bottom-right'
        });
        this.loaderService.display(false);
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/wrong-password':
          case 'auth/user-not-found':
          case 'auth/invalid-email':
            this.error = 'Invalid email or password';
            break;
          case 'auth/too-many-requests':
            this.error = 'Too many login attempts - please try again later';
            break;
          default:
            this.error = 'An unknown error has occurred - please try again later';
        }
        this.loaderService.display(false);
      });
  }
}
