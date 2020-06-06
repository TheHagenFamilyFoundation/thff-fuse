import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { DirectorService } from '../../services/user/director.service';

// utility
import { CreateFieldOpenFpService } from '../../services/full-proposal/utility/create-field-open-fp.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  currentUser: any;

  accessLevel: number;

  IsDirector: boolean;

  // check basic row height
  basicRowHeight = 400;

  constructor(
    public authService: AuthService,
    public router: Router,
    public directorService: DirectorService,
    public createFieldOpenFpService: CreateFieldOpenFpService,
  ) {
    console.log('authService currentUserValue', authService.currentUserValue);

    if (this.authService.currentUserValue) {
      console.log('authService currentUserValue', authService.currentUserValue);

      this.currentUser = this.authService.currentUserValue.user;
      console.log('authService currentUser', authService.currentUserValue.user);
      this.accessLevel = this.currentUser.accessLevel;

      console.log('isAdmin');

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

  ngOnInit() {
  }
}
