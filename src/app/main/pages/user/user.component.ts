import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

import { InOrgService } from '../../../services/user/in-org.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user;

  inOrgCheck: boolean;

  /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} fuseTranslationLoaderService
     */
  constructor(
        private fuseTranslationLoaderService: FuseTranslationLoaderService,
        private router: Router, private inOrg: InOrgService,
  ) {
    this.fuseTranslationLoaderService.loadTranslations(english, turkish);
  }

  ngOnInit() {
    if (!localStorage.getItem('currentUser')) {
      // not logged in so redirect to login page
      this.router.navigate(['/login']);
    }

    this.user = JSON.parse(localStorage.getItem('currentUser'));

    console.log('User - this.user');
    console.log(this.user);

    this.inOrg.currentInOrg.subscribe((message) => this.inOrgCheck = message);
  }
}
