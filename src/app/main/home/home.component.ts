import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    /*
Images
*/
    fullImagePath = '../assets/images/thfflogo1.png';

    fullImagePath2 = '../assets/images/cv_busses1.JPG';

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
