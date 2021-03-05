import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GetNextLoiService {
  API_URL: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    if (!environment.production) {
      this.API_URL = environment.API_URL;
    } else {
      this.API_URL = this.authService.getBackendURL();
      console.log('GetNextLoiService - this.API_URL', this.API_URL);
    }

    if (!this.API_URL.endsWith('/')) {
      // this.API_URL = this.API_URL;
    // } else {
      this.API_URL += '/';
    }

    console.log('GetNextLoiService - this.API_URL', this.API_URL);
  }

  getNextLOI(data: any): Observable<any> {
    const urlString = `${this.API_URL}nextLOI?ts=${data.createdAt}&user=${data.user}&filter=${data.filter}`;

    console.log('urlString', urlString);

    return this.http.get(urlString);
  }
}
