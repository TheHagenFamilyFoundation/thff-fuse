import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PresVotingService {
  API_URL: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    if (!environment.production) {
      this.API_URL = environment.API_URL;
    } else {
      this.API_URL = this.authService.getBackendURL();
      console.log('PresVotingService - this.API_URL', this.API_URL);
    }

    if (!this.API_URL && !this.API_URL.endsWith('/')) {
      this.API_URL += '/';
    }

    console.log('PresVotingService - this.API_URL', this.API_URL);
  }

  vote(data: any): Observable<any> {
    const urlString = `${this.API_URL}vote`;

    return this.http.post(urlString, data);
  }
}
