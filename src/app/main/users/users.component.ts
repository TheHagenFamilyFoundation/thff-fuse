import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'users',
    templateUrl: './users.component.html',
    styleUrls  : ['./users.component.scss']
})
export class UsersComponent
{
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    )
    // {}
    {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    }
}
