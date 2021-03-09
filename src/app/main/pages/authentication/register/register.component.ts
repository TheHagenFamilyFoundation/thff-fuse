import {
  Component, OnDestroy, OnInit, ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder, FormGroup, Validators,
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { confirmPasswordValidator } from '../../../../validators/confirmPasswordValidator';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

// Environment
import { environment } from '../../../../../environments/environment';

// Services
import { AuthService } from '../../../../auth/auth.service';
import { EmailService } from '../../../../services/user/email.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;

    API_URL: string;

    body;

    Submitted = false;

    data;

    results: any;

    userName;

    email;

    password;

    confirmPassword;

    errorMessage: string;

    ShowErrorMessage = false;

    // Private
    private unsubscribeAll: Subject<any>;

    constructor(
        private fuseConfigService: FuseConfigService,
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private emailService: EmailService,
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
        console.log('RegisterComponent - this.API_URL', this.API_URL);
      }

      if (!this.API_URL.endsWith('/')) {
        this.API_URL += '/';
      }

      console.log('RegisterComponent - this.API_URL', this.API_URL);

      // Set the private defaults
      this.unsubscribeAll = new Subject();

      // redirect to home if already logged in
      if (this.authService.currentUserValue) {
        this.router.navigate(['/']);
      }
    }

    // --------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // --------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
      });

      // Update the validity of the 'passwordConfirm' field
      // when the 'password' field changes
      this.registerForm.get('password').valueChanges
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(() => {
          this.registerForm.get('passwordConfirm').updateValueAndValidity();
        });
    }

    onSubmit(): void {
      console.log('submitting');

      this.Submitted = true;

      if (!this.API_URL.endsWith('/')) {
        this.API_URL += '/';
      }

      const urlString = `${this.API_URL}user`;
      const { username } = this.registerForm.value;
      const { email } = this.registerForm.value;
      const { password } = this.registerForm.value;
      const { passwordConfirm } = this.registerForm.value;

      console.log(`username = ${username}`);
      console.log(`email = ${email}`);
      console.log(`password = ${password}`);
      console.log(`passwordConfirm = ${passwordConfirm}`);

      this.body = {
        username,
        email,
        password,
        confirmPassword: passwordConfirm,
      };

      console.log(this.body);
      console.log(urlString);

      // send to api

      this.http.post(urlString, this.body)
        .subscribe(
          (data) => {
            this.results = data;

            localStorage.setItem('token', this.results.token);
            localStorage.setItem('currentUser', JSON.stringify(this.results.user));

            console.log(`token = ${localStorage.getItem('token')}`);
            console.log(`currentUser = ${localStorage.getItem('currentUser')}`);
            console.log(`this.userName = ${username}`);
            console.log(`this.email = ${email}`);

            const emailBody = {
              to: email,
              name: username,
            };
            console.log('emailBody', emailBody);
            this.emailService.sendRegisterUserEmail({
              // from: 'Mailgun Sandbox <postmaster@sandboxXXXXXXXXXXXXXXXXXXXXX.mailgun.org>',
              to: email,
              name: username,
            })
              .subscribe(
                () => {
                  console.log('now login', data);

                  const loginData = {
                    email: this.body.email,
                    password: this.body.password,
                  };

                  // this.router.navigate(['/pages/user']);
                  this.authService.login(loginData)
                    // .login(body, null) // , this.csrfToken)
                    .subscribe(
                      (data) => {
                        console.log('data', data);
                        const { user } = data;
                        console.log('user', user);

                        if (user) {
                          console.log('this.results.user = ', user);

                          localStorage.setItem('token', data.token);
                          localStorage.setItem(
                            'currentUser',
                            JSON.stringify(user),
                          );

                          console.log(`token = ${localStorage.getItem('token')}`);
                          console.log(
                            `currentUser = ${
                              localStorage.getItem('currentUser')}`,
                          );

                          this.router.navigate(['/pages/user']);
                        } else {
                          console.log('we do not have a user?');
                          this.router.navigate(['/home']);
                        }
                      },
                      (error) => {
                        console.log('error', error);
                        this.router.navigate(['/home']);
                      },
                    );
                },
                (err) => console.log(err),
              );
          }, (error) => {
            console.log('error', error);
            this.Submitted = false;
            this.ShowErrorMessage = true;
            this.errorMessage = error;

            setTimeout(() => {
              this.clearErrorMessage();
            }, 3000);
          },

        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this.unsubscribeAll.next();
      this.unsubscribeAll.complete();
    }

    clearErrorMessage(): void {
      this.errorMessage = '';
      this.ShowErrorMessage = false;
    }
}
