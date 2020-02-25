import {
  Component, Inject, OnDestroy, OnInit,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  fuseConfig: any;

  navigation: any;

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {DOCUMENT} document
   * @param {FuseConfigService} fuseConfigService
   * @param {FuseNavigationService} fuseNavigationService
   * @param {FuseSidebarService} fuseSidebarService
   * @param {FuseSplashScreenService} fuseSplashScreenService
   * @param {FuseTranslationLoaderService} fuseTranslationLoaderService
   * @param {Platform} platform
   * @param {TranslateService} translateService
   */
  constructor(
    @Inject(DOCUMENT) private document: any,
    private fuseConfigService: FuseConfigService,
    private fuseNavigationService: FuseNavigationService,
    private fuseSidebarService: FuseSidebarService,
    private fuseSplashScreenService: FuseSplashScreenService,
    private fuseTranslationLoaderService: FuseTranslationLoaderService,
    private translateService: TranslateService,
    private platform: Platform,
  ) {
    // Get default navigation
    this.navigation = navigation;

    // Register the navigation to the service
    this.fuseNavigationService.register('main', this.navigation);

    // Set the main navigation as our current navigation
    this.fuseNavigationService.setCurrentNavigation('main');

    // Add languages
    this.translateService.addLangs(['en', 'tr']);

    // Set the default language
    this.translateService.setDefaultLang('en');

    // Set the navigation translations
    this.fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

    // Use a language
    this.translateService.use('en');

    /**
       * ----------------------------------------------------------------------------------------
       * ngxTranslate Fix Start
       * ----------------------------------------------------------------------------------------
       */

    /**
       * If you are using a language other than the default one, i.e. Turkish in this case,
       * you may encounter an issue where some of the components are not actually being
       * translated when your app first initialized.
       *
       * This is related to ngxTranslate module and below there is a temporary fix while we
       * are moving the multi language implementation over to the Angular's core language
       * service.
       * */

    // Set the default language to 'en' and then back to 'tr'.
    // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
    // been selected and there is no way to force it, so we overcome the issue by switching
    // the default language back and forth.
    /**
       setTimeout(() => {
          this._translateService.setDefaultLang('en');
          this._translateService.setDefaultLang('tr');
       });
       */

    /**
       * ----------------------------------------------------------------------------------------
       * ngxTranslate Fix End
       * ----------------------------------------------------------------------------------------
       */

    // Add is-mobile class to the body if the platform is mobile
    if (this.platform.ANDROID || this.platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

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
    // Subscribe to config changes
    this.fuseConfigService.config
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((config) => {
        this.fuseConfig = config;

        // Boxed
        if (this.fuseConfig.layout.width === 'boxed') {
          this.document.body.classList.add('boxed');
        } else {
          this.document.body.classList.remove('boxed');
        }

        // Color theme - Use normal for loop for IE11 compatibility
        for (let i = 0; i < this.document.body.classList.length; i += 1) {
          const className = this.document.body.classList[i];

          if (className.startsWith('theme-')) {
            this.document.body.classList.remove(className);
          }
        }

        this.document.body.classList.add(this.fuseConfig.colorTheme);
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
}
