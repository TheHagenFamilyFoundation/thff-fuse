import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { InterfaceImage } from './IImage';

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
  // fullImagePath = '../assets/images/thfflogo1.png'; // not working

  fullImagePath2 = '../assets/images/cv_busses1.JPG';

  imageUrlArray: (string | InterfaceImage)[] = [
    {
      url: this.fullImagePath2,
      caption: `The Christus Victor pre-school children are happy with
    their new buses. The Foundation was delighted to help
    with their purchase (2009).`,
      href: '#config',
    },
    { url: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg', clickAction: () => alert('custom click function') },
    { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg', caption: 'Apple TV', href: 'https://www.apple.com/' },
    'https://cdn.vox-cdn.com/uploads/chorus_image/image/56674755/mr_pb_is_the_best.0.jpg']

  // imageUrlArray = [this.fullImagePath2, this.fullImagePath2];
  // imageUrlArray = [this.fullImagePath2, this.fullImagePath2];

  height = '400px';

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
