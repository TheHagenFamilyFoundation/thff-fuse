import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { wait } from '../utilities/wait';

import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../_models/user';
import { Environment } from '../_models/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    API_URL: string;

    jwtHelper = new JwtHelperService();

    private currentUserSubject: BehaviorSubject<User>;

    public currentUser: Observable<User>;

    private environmentSubject: BehaviorSubject<Environment>;

    public apiURL: Observable<Environment>;

    constructor(private http: HttpClient, private router: Router) {
      console.log('auth service constructor');
      console.log('auth service - environment', environment);

      if (!environment.production) {
        console.log('production env', environment.production);
        this.API_URL = environment.API_URL;
      } else {
        this.API_URL = this.getBackendURL();
      }

      console.log('auth-service - this.API_URL', this.API_URL);

      if (!this.API_URL.endsWith('/')) {
        this.API_URL += '/';
      }

      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();

      this.environmentSubject = new BehaviorSubject<Environment>(JSON.parse(localStorage.getItem('backend_url')));
      this.apiURL = this.environmentSubject.asObservable();
    }

    public get currentUserValue(): any {
      return this.currentUserSubject.value;
    }

    public get envURL(): any {
      return this.currentUserSubject.value;
    }

    // login(data,csrf)
    login(data) {
      console.log('LOGIN - data', data);

      if (!environment.production) {
        this.API_URL = environment.API_URL;
      } else {
        this.API_URL = this.getBackendURL();

        console.log('auth service - this.API_URL', this.API_URL);
      }

      if (!this.API_URL.endsWith('/')) {
        this.API_URL += '/';
      }

      console.log('login - this.API_URL', this.API_URL);

      return this.http.put<any>(`${this.API_URL}login`, data)
        .pipe(map((result) => {
          // result = user
          console.log('authService - login - result', result);
          // store user details and jwt token in local storage to keep
          // user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(result));
          localStorage.setItem('token', JSON.stringify(result.token));
          this.currentUserSubject.next(result);
          // TODO
          wait(1000);
          console.log(`AUTH - Current User ${localStorage.getItem('currentUser')}`);
          return result;
        }));
    }

    logout() {
      console.log('logging out');

      // Remove tokens and profile and update login status subject
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/home']);
    }

    tokenGetter() {
      return localStorage.getItem('token');
    }

    isExpired() {
      return this.jwtHelper.isTokenExpired(this.tokenGetter());
    }

    initializeBackendURL(): Observable<any> {
      console.log('initialize backend url');
      if (environment.production === true) {
        console.log('getting backend URL', `${window.location.origin}/backend`);

        return this.http.get(`${window.location.origin}/backend`);
      }
    }

    getBackendURL(): string {
      return sessionStorage.getItem('backend_url');
    }

    clearBackendURL(): void {
      sessionStorage.removeItem('backend_url');
    }
}
