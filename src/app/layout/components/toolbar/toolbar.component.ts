import {
  Component, OnDestroy, OnInit, ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;

    rightNavbar: boolean;

    hiddenNavbar: boolean;

    languages: any;

    navigation: any;

    selectedLanguage: any;

    userStatusOptions: any[];

    LoggedIn: boolean;

    // Private
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} fuseConfigService
     * @param {FuseSidebarService} fuseSidebarService
     * @param {TranslateService} translateService
     */
    constructor(
        private fuseConfigService: FuseConfigService,
        private fuseSidebarService: FuseSidebarService,
        private translateService: TranslateService,
    ) {
      this.LoggedIn = false;

      // Set the defaults
      this.userStatusOptions = [
        {
          title: 'Online',
          icon: 'icon-checkbox-marked-circle',
          color: '#4CAF50',
        },
        {
          title: 'Away',
          icon: 'icon-clock',
          color: '#FFC107',
        },
        {
          title: 'Do not Disturb',
          icon: 'icon-minus-circle',
          color: '#F44336',
        },
        {
          title: 'Invisible',
          icon: 'icon-checkbox-blank-circle-outline',
          color: '#BDBDBD',
        },
        {
          title: 'Offline',
          icon: 'icon-checkbox-blank-circle-outline',
          color: '#616161',
        },
      ];

      this.languages = [
        {
          id: 'en',
          title: 'English',
          flag: 'us',
        },
        {
          id: 'tr',
          title: 'Turkish',
          flag: 'tr',
        },
      ];

      this.navigation = navigation;

      // Set the private defaults
      this.unsubscribeAll = new Subject();
    }

    // --------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // --------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
      // Subscribe to the config changes
      this.fuseConfigService.config
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((settings) => {
          this.horizontalNavbar = settings.layout.navbar.position === 'top';
          this.rightNavbar = settings.layout.navbar.position === 'right';
          this.hiddenNavbar = settings.layout.navbar.hidden === true;
        });

      // Set the selected language from default languages
      this.selectedLanguage = _.find(this.languages, {
        id: this.translateService.currentLang,
      });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this.unsubscribeAll.next();
      this.unsubscribeAll.complete();
    }

    // --------------------------------------------------------------------------------------------
    // @ Public methods
    // --------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
      this.fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
      // Do your search here...
      console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
      // Set the selected language for the toolbar
      this.selectedLanguage = lang;

      // Use the selected language for translations
      this.translateService.use(lang.id);
    }

    login(): void {
      this.LoggedIn = true;
    }
}
