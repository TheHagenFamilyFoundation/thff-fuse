/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */

import { Injectable } from '@angular/core';
import {
  Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,
} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public snackBar: MatSnackBar, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('this is the canActivate function');

    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // logged in so return true
      return true;
    }

    const snackBarRef = this.snackBar.open('You need to be logged In to access that page', 'OK', {
      duration: 3000,
    });

    console.log('not authenticated');

    // not logged in so redirect to login page
    this.router.navigate(['/pages/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
