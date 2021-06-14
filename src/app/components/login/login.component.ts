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
  /*
   * Declare form group variable to store form validators and fields' initial values
   * (instantiated in constructor once FormBuilder has been injected); also initiate local
   * error variable as an empty string
   */
  loginForm!: FormGroup;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private loaderService: LoaderService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  /* Hide top nav settings button, as it is only used in Dashboard component */
  ngOnInit() {
    document.getElementById('nav-settings-btn')?.classList.add('hide');
  }

  /* Trigger login method if key 13 is lifted ('enter' key on keyboard) */
  onKeyUp(event: any): void {
    console.log('key')
    if (event.keyCode === 13) {
      console.log('13')
      this.onLogin();
    }
  }

  /*
   * 1 - Start up loading spinner (set back to false later regardless of login success)
   * 2 - Retrieve email and password values from login form by destructuring value object
   * 3 - Send email and password to Angular Fire Auth to validate
   * 4 - If successful, display success toast and navigate to home page (Song Search)
   * 5 - If unsuccessful, handle error and display appropriate error message to user
   */
  onLogin() {
    this.loaderService.display(true); /* 1 */
    const { email, password } = this.loginForm.value; /* 2 */
    this.auth
      .signInWithEmailAndPassword(email, password) /* 3 */
      .then(() => { /* 4 */
        this.router.navigate(['']);
        this.toastr.success('', 'Successfully logged in', {
          positionClass: 'toast-bottom-right'
        });
        this.loaderService.display(false);
      })
      .catch((err) => { /* 5 */
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
