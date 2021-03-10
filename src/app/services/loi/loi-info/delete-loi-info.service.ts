import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { AuthService } from '../../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteLoiInfoService {
  API_URL: string;

  results;

  body;

  constructor(private http: HttpClient, private authService: AuthService) {
    if (!environment.production) {
      this.API_URL = environment.API_URL;
    } else {
      this.API_URL = this.authService.getBackendURL();
      console.log('DeleteLoiInfoService - this.API_URL', this.API_URL);
    }

    if (!this.API_URL && !this.API_URL.endsWith('/')) {
      this.API_URL += '/';
    }
    console.log('DeleteLoiInfoService - this.API_URL', this.API_URL);
  }

  deleteLoiInfobyLoiInfoID(loiInfoID: string): Observable<any> {
    console.log('deleteLoiInfobyLoiID');

    const urlString = `${this.API_URL}loiInfo/${loiInfoID}`;

    return this.http.delete(urlString);
  }
}
