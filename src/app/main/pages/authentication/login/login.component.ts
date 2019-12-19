import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";

import { AuthService } from "../../../../auth/auth.service";

import { environment } from "../../../../../environments/environment";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    title = "LOGIN TO YOUR ACCOUNT"; //default
    //when submitting changes to LOGGING IN...

    API_URL: string;

    ShowMessage = false;
    message: any;

    Login: any;

    Submitted = false;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _router: Router,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        if (!environment.production) {
            this.API_URL = environment.API_URL;
        }

        this.getBackendURL();

        console.log("this.API_URL", this.API_URL);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required]
        });
    }

    onSubmit(): void {
        console.log("submitting");
        console.log("loginForm", this.loginForm);
        this.title = "LOGGING IN";

        this.Submitted = true;

        let email = this.loginForm.value.email;
        let password = this.loginForm.value.password;

        console.log("email = " + email);
        console.log("password = " + password);

        // this.CSRF = this.getCSRFTokenService.getCSRF()
        //   .subscribe(
        //     (data) => {

        // console.log('after CSRF', this.API_URL)

        // if (data._csrf) {
        //   this.csrfToken = data._csrf;
        // }

        //login url
        let urlString = this.API_URL + "/login";

        let body = {
            email: email,
            password: password
            // _csrf: this.csrfToken //|| undefined
        };

        // if (this.csrfToken) {
        //   this.body._csrf = this.csrfToken;
        // }

        console.log("body", body);
        console.log("urlString", urlString);

        this.Login = this._authService
            .login(body, null) //, this.csrfToken)
            .subscribe(
                data => {
                    console.log("data", data);
                    let user = data.user;
                    console.log("user", user);

                    if (user) {
                        console.log("this.results.user = ", user);

                        localStorage.setItem("token", data.token);
                        localStorage.setItem(
                            "currentUser",
                            JSON.stringify(user)
                        );

                        console.log("token = " + localStorage.getItem("token"));
                        console.log(
                            "currentUser = " +
                                localStorage.getItem("currentUser")
                        );

                        this._router.navigate(["/pages/user"]);
                    } else {
                        this.message = data.message;
                        this.ShowMessage = true;
                        this.title = "LOGIN TO YOUR ACCOUNT";
                    }
                },
                error => {
                    console.log("error", error);

                    this.message = error.error.message;

                    console.log("message", this.message);

                    this.title = "LOGIN TO YOUR ACCOUNT";
                    this.ShowMessage = true;
                    this.Submitted = false;
                }
            );

        //})
    }

    getBackendURL() {
        console.log("environment", environment);
        if (environment.production) {
            this.API_URL = environment.API_URL;

            this._authService.initializeBackendURL().subscribe(backendUrl => {
                console.log("backendUrl", backendUrl);
                console.log("backendUrl", backendUrl.url);

                if (backendUrl) {
                    sessionStorage.setItem("backend_url", backendUrl.url);
                } else {
                    console.log(
                        "Can´t find the backend URL, using a failover value"
                    );
                    sessionStorage.setItem(
                        "backend_url",
                        "https://failover-url.com"
                    );
                }

                this.API_URL = backendUrl.url || "http://localhost:1337";
            });
        }
    }
}
