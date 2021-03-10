import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  API_URL: string;

  data: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    if (!environment.production) {
      this.API_URL = environment.API_URL;
    } else {
      this.API_URL = this.authService.getBackendURL();
      console.log('AddUserService - this.API_URL', this.API_URL);
    }

    if (!this.API_URL && !this.API_URL.endsWith('/')) {
      this.API_URL += '/';
    }
    console.log('AddUserService - this.API_URL', this.API_URL);
  }

  addUser(users): Observable<any> {
    const data = users;

    console.log('data', data);

    return this.http.post(`${this.API_URL}addUser`, data);
  }
}
