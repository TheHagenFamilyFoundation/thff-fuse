import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';


import { AuthService } from '../../../auth/auth.service';

import { InOrgService } from '../../../services/user/in-org.service';
import { GetUserService } from '../../../services/user/get-user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  // check basic row height
  basicRowHeight = 500;

  currentUser: any;

  user: any;

  userName: string;

  organizations: any;

  lois: any;

  inOrgCheck: boolean;

  /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} fuseTranslationLoaderService
     */
  constructor(
        private fuseTranslationLoaderService: FuseTranslationLoaderService,
        private router: Router, private inOrg: InOrgService,
        private authService: AuthService,
        private getUserService: GetUserService,
  ) {
    this.fuseTranslationLoaderService.loadTranslations(english, turkish);

    this.authService.currentUser.subscribe((x) => {
      console.log('user component - constructor - x', x);
      this.currentUser = x;
      if (this.currentUser && this.currentUser.user) {
        this.user = this.currentUser.user;
        this.userName = this.user.username;
      } else {
        console.error('user component - no user');
      }
    });
  }

  ngOnInit() {
    console.log('inside user component ng oninit');

    console.log('user component - currentUser - ', JSON.parse(localStorage.getItem('currentUser')).user);

    if (!localStorage.getItem('currentUser')) {
      console.log('user component no currentUser - navigate to login');
      // not logged in so redirect to login page
      this.router.navigate(['/login']);
    }

    this.getUser();

    console.log('User component - user =', this.currentUser);

    this.inOrg.currentInOrg.subscribe((message) => { this.inOrgCheck = message; });
  }

  getUser() {
    console.log('user - getUser');

    console.log('user component - currentUser - ', JSON.parse(localStorage.getItem('currentUser')).user);

    this.getUserService.getUserbyUsername(this.userName)
      .subscribe((user) => {
        // pass in the user to the check functions
        console.log('user component - get full user ', user);
        this.organizations = user[0].organizations;
        this.lois = user[0].lois;
      });
  }
}
