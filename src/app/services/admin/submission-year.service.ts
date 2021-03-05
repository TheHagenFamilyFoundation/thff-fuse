import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SubmissionYearService {
  API_URL: string;

  data: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    if (!environment.production) {
      this.API_URL = environment.API_URL;
      // } else {
      this.API_URL = this.authService.getBackendURL();
      console.log('SubmissionYearService - this.API_URL', this.API_URL);
    }

    if (!this.API_URL.endsWith('/')) {
      // this.API_URL = this.API_URL;
    // } else {
      this.API_URL += '/';
    }

    console.log('SubmissionYearService - this.API_URL', this.API_URL);
  }

  createFieldopenFp(): Observable<any> {
    // empty
    const data = {};

    console.log('data', data);

    return this.http.post(`${this.API_URL}createFieldopenFp`, data);
  }

  createSubmissionYear(): Observable<any> {
    const today = new Date();
    const currentYear = today.getFullYear();

    const data = {
      year: currentYear,
    };

    console.log('data', data);

    return this.http.post(`${this.API_URL}submissionyear`, data);
  }

  getSubmissionYear(id): Observable<any> {
    return this.http.get(`${this.API_URL}submissionyear/${id}`);
  }

  // get all submission years
  getSubmissionYears(): Observable<any> {
    return this.http.get(`${this.API_URL}submissionyear`);
  }

  // pass in the submission year id
  closeSubmissionYear(data): Observable<any> {
    console.log('closeSubmissionYear - data', data);

    return this.http.post(`${this.API_URL}closeSubmissionYear`, data);
  }
}
