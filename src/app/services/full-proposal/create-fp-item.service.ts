import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CreateFpItemService {
  API_URL: string;

  data: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    if (!environment.production) {
      this.API_URL = environment.API_URL;
    } else {
      this.API_URL = this.authService.getBackendURL();
      console.log('CreateFpItemService - this.API_URL', this.API_URL);
    }

    console.log('CreateFpItemService - this.API_URL', this.API_URL);
  }

  createFPItem(fpItem): Observable<any> {
    const data = fpItem;

    console.log('data', data);

    return this.http.post(`${this.API_URL}/fullproposalitem`, data);
  }

  createFPItems(fpItems): Observable<any> {
    console.log('createFPItems', fpItems);

    const data = fpItems;

    console.log('data', data);

    return this.http.post(`${this.API_URL}/fpItems`, data);
  }
}
