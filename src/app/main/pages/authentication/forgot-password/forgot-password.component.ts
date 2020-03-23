import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../../../../environments/environment';

// services
import { FuseConfigService } from '@fuse/services/config.service';

// import { ValidEmailService } from '../../../../services/user/valid-email.service';
// import { ValidUserNameService } from '../../../../services/user/valid-username.service';
import { EmailService } from '../../../../services/user/email.service';
import { ResetCodeService } from '../../../../services/user/reset-code.service';

import { AuthService } from '../../../../auth/auth.service';

import { fuseAnimations } from '@fuse/animations';

// // debounce
// import { Subject } from 'rxjs';

// import {
//   map, takeUntil, tap, debounceTime, distinctUntilChanged,
// } from 'rxjs/operators';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  API_URL: string;

  /**
   * Constructor
   *
   * @param {FuseConfigService} fuseConfigService
   * @param {FormBuilder} formBuilder
   */
  constructor(
    private fuseConfigService: FuseConfigService,
    private formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    // private validEmailService: ValidEmailService,
    // private validUserNameService: ValidUserNameService,
    private emailService: EmailService,
    private resetService: ResetCodeService,
    private authService: AuthService,
  ) {
    // Configure the layout
    this.fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        toolbar: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        sidepanel: {
          hidden: true,
        },
      },
    };

    if (!environment.production) {
      this.API_URL = environment.API_URL;
    } else {
      this.API_URL = this.authService.getBackendURL();
      console.log('ForgotPasswordComponent - this.API_URL', this.API_URL);
    }

    console.log('ForgotPasswordComponent - this.API_URL', this.API_URL);
  }

  // --------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // --------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  resetPassword(): void {
    console.log('You clicked on the Reset Password');

    // this works
    const snackBarRef = this.snackBar.open('Please check your email for reset instructions.', 'OK', {
      duration: 3000,
    });

    // create random function that creates a password
    // call the createResetCode
    this.resetService.createResetCode({
      email: this.forgotPasswordForm.get('email').value,
    })
      .subscribe(
        (data) => {
          // debug
          console.log(data);
          console.log('data');

          if (data.resetCodeCreated) {
            const message = 'Your password is reset';
            console.log('after');
            this.emailService.sendResetPasswordEmail({
              from: 'Mailgun Sandbox <postmaster@sandboxXXXXXXXXXXXXXXXXXXXXX.mailgun.org>',
              to: this.forgotPasswordForm.get('email').value,
              // name: this.userName,
              text: message,
              resetCode: data.resetCode,
              // resetTime: data.resetTime
            })
              .subscribe(
                // () => { },
                (err) => console.log(err),
              );
          } else {
            console.log('Unable to reset password');
          }
        },
      );

    this.router.navigate(['pages/auth/login']);
  }// end of resetPassword
}
