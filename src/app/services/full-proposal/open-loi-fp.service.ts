import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OpenLoiFpService {
  API_URL: string;

  data: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    if (!environment.production) {
      this.API_URL = environment.API_URL;
    } else {
      this.API_URL = this.authService.getBackendURL();
      console.log('OpenLoiFpService - this.API_URL', this.API_URL);
    }

    console.log('OpenLoiFpService - this.API_URL', this.API_URL);
  }

  openFPs(body): Observable<any> {
    // flag for opening or closing
    const data = body;

    console.log('data', data);

    return this.http.post(`${this.API_URL}/loiFP`, data);
  }
}
