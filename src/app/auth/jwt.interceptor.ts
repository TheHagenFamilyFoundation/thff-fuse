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

    if (this.authService.isExpired()) {
      console.log('TOKEN EXPIRED');
      return next.handle(request);
    }
    console.log('progressing forward');
    // add auth header with jwt if user is logged in and request is to the api url
    const currentUser = this.authService.currentUserValue;
    console.log('jwt-interceptor - currentUser', currentUser);

    const isLoggedIn = currentUser && currentUser.token;

    console.log('jwt-interceptor - isLoggedIn', isLoggedIn);
    console.log('environment', environment);
    console.log('sessionStorage.getItem(backend_url)', sessionStorage.getItem('backend_url'));

    let isApiUrl = false;

    if (environment.production) {
      isApiUrl = request.url.startsWith(sessionStorage.getItem('backend_url'));
    } else {
      // local
      isApiUrl = request.url.startsWith(environment.API_URL);
    }

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
