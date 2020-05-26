/* eslint-disable no-param-reassign */
import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  // eslint-disable-next-line no-useless-constructor
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('adding jwt');

    // add auth header with jwt if user is logged in and request is to the api url
    const currentUser = this.authService.currentUserValue;
    console.log('jwt-interceptor - currentUser', currentUser);

    const isLoggedIn = currentUser && currentUser.token;

    console.log('jwt-interceptor - isLoggedIn', isLoggedIn);
    console.log('environment', environment);
    const isApiUrl = request.url.startsWith(localStorage.getItem('backend_url'));
    console.log('jwt-interceptor - isApiUrl', isApiUrl);

    if (isLoggedIn && isApiUrl) {
      console.log('adding token to request');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
