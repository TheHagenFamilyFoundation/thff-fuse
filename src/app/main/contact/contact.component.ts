import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} fuseTranslationLoaderService
     */
  constructor(
        private fuseTranslationLoaderService: FuseTranslationLoaderService,
  ) {
    this.fuseTranslationLoaderService.loadTranslations(english, turkish);
  }
}
