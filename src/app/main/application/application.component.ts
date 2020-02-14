import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  currentUser: any;

  /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} fuseTranslationLoaderService
     */
  constructor(
    public authService: AuthService,
    private fuseTranslationLoaderService: FuseTranslationLoaderService,
  ) {
    this.fuseTranslationLoaderService.loadTranslations(english, turkish);

    if (!this.authService.isExpired()) {
      console.log('currentUser');
      console.log(localStorage.getItem('currentUser'));

      if (localStorage.getItem('currentUser')) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      }
    }
  }

  ngOnInit() {
  }
}
