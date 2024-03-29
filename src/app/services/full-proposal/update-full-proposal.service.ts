import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateFullProposalService {
  API_URL: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    if (!environment.production) {
      this.API_URL = environment.API_URL;
    } else {
      this.API_URL = this.authService.getBackendURL();
      console.log('UpdateFullProposalService - this.API_URL', this.API_URL);
    }

    console.log('UpdateFullProposalService - this.API_URL', this.API_URL);
  }

  updateFullProposal(data: any): Observable<any> {
    const urlString = `${this.API_URL}/fullproposal/${data.id}`;

    return this.http.patch(urlString, data);
  }
}
