import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../auth/auth.service';

@Injectable()
export class SetNewPasswordService {
  API_URL: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    if (!environment.production) {
      this.API_URL = environment.API_URL;
    } else {
      this.API_URL = this.authService.getBackendURL();
      console.log('SetNewPasswordService - this.API_URL', this.API_URL);
    }

    if (!this.API_URL && !this.API_URL.endsWith('/')) {
      this.API_URL += '/';
    }

    console.log('SetNewPasswordService - this.API_URL', this.API_URL);
  }

  setNewPassword(data): Observable<any> {
    if (!environment.production) {
      this.API_URL = environment.API_URL;
    } else {
      this.API_URL = this.authService.getBackendURL();
      console.log('set new password - this.API_URL', this.API_URL);
    }

    // console.log(data);
    // data is the user current, new, and confirm passwords
    return this.http.put(`${this.API_URL}setNewPassword`, data);
  }
}
