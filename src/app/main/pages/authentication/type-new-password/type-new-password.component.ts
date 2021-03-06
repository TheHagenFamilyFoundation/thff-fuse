import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MyErrorStateMatcher } from './myErrorStateMatcher';

import { environment } from '../../../../../environments/environment';

// services
import { FuseConfigService } from '@fuse/services/config.service';

import { AuthService } from '../../../../auth/auth.service';

// TODO
// import { ValidEmailService } from '../../../../services/user/valid-email.service';
import { ValidUserNameService } from '../../../../services/user/valid-username.service';
import { EmailService } from '../../../../services/user/email.service';
import { SetNewPasswordService } from '../../../../services/user/set-new-password.service';
import { GetUserService } from '../../../../services/user/get-user.service';
import { ValidResetCodeService } from '../../../../services/user/valid-resetcode.service';


import { fuseAnimations } from '@fuse/animations';

// // debounce
// import { Subject } from 'rxjs';

// import {
//   map, takeUntil, tap, debounceTime, distinctUntilChanged,
// } from 'rxjs/operators';

@Component({
  selector: 'type-new-password',
  templateUrl: './type-new-password.component.html',
  styleUrls: ['./type-new-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class TypeNewPasswordComponent implements OnInit {
  typeNewPasswordForm: FormGroup;

  API_URL: string;

  user: any;

  userName: any;

  email: any;

  message: any;

  resetCode: any;

  private sub: any;

  CanSetNewPassword = false; // initialize to false

  ShowCurrentNewError = false;

  ShowNewConfirmError = false;

  ShowConfirmPassword = false;

  ShowMessage = false;

  ValidPasswordReset: any;

  ValidUserName: any;

  ValidResetCode: any;

  matcher = new MyErrorStateMatcher();

  hide = true;

  /**
   * Constructor
   *
   * @param {FuseConfigService} fuseConfigService
   * @param {FormBuilder} formBuilder
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fuseConfigService: FuseConfigService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    // private validEmailService: ValidEmailService,
    private validUserNameService: ValidUserNameService,
    private emailService: EmailService,
    private getUserService: GetUserService,
    private authService: AuthService,
    private setNewPasswordService: SetNewPasswordService,
    private validResetCodeService: ValidResetCodeService,
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
      console.log('TypeNewPasswordComponent - this.API_URL', this.API_URL);
      // if (!this.API_URL) {
      //   this.authService.initializeBackendURL();
      //   this.API_URL = this.authService.getBackendURL();
      // }
    }

    console.log('TypeNewPasswordComponent - this.API_URL', this.API_URL);
  }

  // --------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // --------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    console.log('typenewpassword ngoninit');

    this.getBackendURL();

    this.typeNewPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.checkPasswords });

    this.sub = this.route.params.subscribe((params) => {
      this.resetCode = params.resetCode; // (+) converts string 'id' to a number
      // this.userName = params.username;

      console.log('this.resetCode');
      console.log(this.resetCode);

      console.log('type new password');

      this.getBackendURL();

      if (!environment.production) {
        this.API_URL = environment.API_URL;
      } else {
        this.API_URL = this.authService.getBackendURL();
        console.log('TypeNewPasswordComponent - this.API_URL', this.API_URL);
      }

      console.log('TypeNewPasswordComponent - this.API_URL', this.API_URL);


      // this.checkUserName();
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('newPassword').value;
    const confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  setNewPassword(): void {
    console.log('set New Password');
    console.log('typenewpassword - username', this.userName);

    // pass the new password and reset code
    const payload = {
      np: this.typeNewPasswordForm.get('newPassword').value,
      conp: this.typeNewPasswordForm.get('confirmPassword').value,
      rc: this.resetCode,
    };

    let reset = false;

    this.ValidPasswordReset = this.setNewPasswordService.setNewPassword(payload)
      .subscribe(
        (data) => {
          console.log('new password set');
          console.log('data');
          console.log(data);

          reset = data.reset;
          const { message } = data;

          if (message) {
            console.log(`message: ${message}`);
            this.ShowMessage = true;

            this.message = message;
          }

          if (reset) {
            const snackBarRef = this.snackBar.open(message, 'OK', {
              duration: 5000,
            });

            this.router.navigate(['pages/auth/login']);
          } else {
            // error message

            console.log(`Error: ${reset}`);
            this.CanSetNewPassword = false;
          }
        },
      );
  }// end of setNewPassword

  getBackendURL() {
    console.log('typenewpassword - getBackgroundURL');

    if (environment.production) {
      this.authService.initializeBackendURL().subscribe(
        (backendUrl) => {
          console.log('typenewpassword component - backendUrl', backendUrl.url);

          if (backendUrl) {
            sessionStorage.setItem('backend_url', backendUrl.url);
          } else {
            console.log('Can´t find the backend URL, using a failover value');
            sessionStorage.setItem('backend_url', 'https://failover-url.com');
          }

          this.API_URL = backendUrl.url;

          // this.checkResetCode();
        },
      );
    }
  }

  // old
  checkUserName(): void {
    console.log('checkUserName');

    this.ValidUserName = this.validUserNameService.checkValidUserName(this.userName)
      .subscribe(
        (data) => {
          // debug
          console.log(data);
          console.log('data');

          if (data.userfound) {
            console.log('user found');
            this.checkResetCode();
          } else {
            console.log('user not found');
            this.router.navigate(['home']);
          }
        },
      );
  }// end of checkUserName

  // also checks the time and the resetPassword field if true or false
  // false implying that the user already reset the password
  // old
  checkResetCode(): void {
    console.log('checkResetCode', this.resetCode);

    this.ValidResetCode = this.validResetCodeService.checkValidResetCode(this.resetCode)
      .subscribe(
        (data) => {
          // debug
          console.log('typenewpassword - checkresetcode - data', data);
          this.userName = data.user.username;

          const { message } = data;

          if (data.validresetCode) {
            console.log('reset code found');
            console.log(message);
            // this.checkResetTime();
          } else {
            console.log('reset code not found');
            console.log(message);
            // show a toast before redirect

            const snackBarRef = this.snackBar.open(message, 'OK', {
              duration: 3000,
            });

            this.router.navigate(['home']);
          }
        },
      );
  }// end of checkResetCode
}
