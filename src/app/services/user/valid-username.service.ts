import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../auth/auth.service';

@Injectable()
export class ValidUserNameService {
  API_URL: string;

  BackendURL: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    if (!environment.production) {
      this.API_URL = environment.API_URL;
    } else {
      this.API_URL = this.authService.getBackendURL();
      console.log('ValidUserNameService - this.API_URL', this.API_URL);
    }

    if (!this.API_URL.endsWith('/')) {
      // this.API_URL = this.API_URL;
    // } else {
      this.API_URL += '/';
    }

    console.log('ValidUserNameService - this.API_URL', this.API_URL);
  }

  checkValidUserName(username: string): Observable<any> {
    if (!environment.production) {
      if (!environment.production) {
        this.API_URL = environment.API_URL;
      } else {
        this.API_URL = this.authService.getBackendURL();
        console.log('valid username - this.API_URL', this.API_URL);
      }

      const urlString = `${this.API_URL}UserNameExists?username=${username}`;

      return this.http.get(urlString);
    }


    console.log('backendURL', sessionStorage.getItem('backend_url'));

    const backendURL = sessionStorage.getItem('backend_url');

    // null
    if (!backendURL) {
      console.log('no backendurl');

      this.BackendURL = this.authService.initializeBackendURL();

      this.BackendURL.subscribe(
        (backendUrl) => {
          console.log('backendUrl', backendUrl.url);

          if (backendUrl) {
            sessionStorage.setItem('backend_url', backendUrl.url);
          } else {
            console.log('Can´t find the backend URL, using a failover value');
            sessionStorage.setItem('backend_url', 'https://failover-url.com');
          }

          this.API_URL = backendUrl.url;

          if (!this.API_URL.endsWith('/')) {
            // this.API_URL = this.API_URL;
          // } else {
            this.API_URL += '/';
          }

          const urlString = `${this.API_URL}UserNameExists?username=${username}`;

          console.log('urlString', urlString);

          return this.http.get(urlString);
        },
      );
    } else {
      this.API_URL = this.authService.getBackendURL();
      console.log('ValidUserNameService - this.API_URL', this.API_URL);

      if (!this.API_URL.endsWith('/')) {
        // this.API_URL = this.API_URL;
      // } else {
        this.API_URL += '/';
      }

      const urlString = `${this.API_URL}UserNameExists?username=${username}`;

      console.log('urlString', urlString);

      return this.http.get(urlString);
    }
  }
}
