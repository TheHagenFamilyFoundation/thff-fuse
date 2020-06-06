import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../../../auth/auth.service';
import { DirectorService } from '../../../../services/user/director.service';

@Component({
  selector: 'directors-menu',
  templateUrl: './directors-menu.component.html',
  styleUrls: ['./directors-menu.component.scss'],
})
export class DirectorsMenuComponent {
  currentUser: any;

  accessLevel: number;

  IsDirector: boolean;

  // check basic row height
  basicRowHeight = 400;

  constructor(
    public authService: AuthService,
    public router: Router,
    public directorService: DirectorService,
  ) {
    console.log('authService currentUserValue', authService.currentUserValue);

    if (this.authService.currentUserValue) {
      console.log('authService currentUserValue', authService.currentUserValue);

      this.currentUser = this.authService.currentUserValue.user;
      console.log('authService currentUser', authService.currentUserValue.user);
      this.accessLevel = this.currentUser.accessLevel;

      console.log('isDirector');

      if (this.accessLevel > 1) {
        this.IsDirector = true;
      } else {
        this.IsDirector = false;

        this.router.navigate(['/pages/auth/logout']);
      }
    } else {
      // logout
      this.router.navigate(['/pages/auth/logout']);
    }
  }
}
