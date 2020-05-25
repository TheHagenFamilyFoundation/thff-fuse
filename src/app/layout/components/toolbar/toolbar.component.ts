import {
  Component, OnDestroy, OnInit, ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';

import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../../auth/auth.service';
import { DirectorService } from '../../../services/user/director.service';

import { GetUserService } from '../../../services/user/get-user.service'; // used for getting organizations
import { InOrgService } from '../../../services/user/in-org.service';

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

    currentUser: any;

    userName: string;

    accessLevel: number;

    organizations: any;

    InOrganization: boolean;

    inOrgCheck: boolean;

    IsDirector: boolean;

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
        public authService: AuthService,
        public directorService: DirectorService,
        private getUserService: GetUserService,
        private inOrg: InOrgService,
        private router: Router,
        public dialog: MatDialog,
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

      // this.checkLoggedIn();
      this.authService.currentUser.subscribe((x) => {
        console.log('toolbar - constructor - x', x);
        this.currentUser = x;
      });
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

      this.inOrg.currentInOrg.subscribe((message) => {
        this.inOrgCheck = message;

        console.log('inOrgCheck change', this.inOrgCheck);
        if (this.inOrgCheck) {
          console.log('in org');
          this.InOrganization = true;
        } else {
          this.InOrganization = false;
        }
      });
      this.authService.currentUser.subscribe((x) => {
        console.log('toolbar - ngOnInit - x', x);
        this.currentUser = x;
      });
      // this.directorService.currentIsDirector.subscribe(message => {

      //   this.IsDirector = message;

      //   // console.log('isdirector change', this.accessLevel)

      //   // if (this.accessLevel > 1) {

      //   //   console.log('isDirector')

      //   //   this.IsDirector = true;
      //   // }
      //   // else {
      //   //   this.IsDirector = false;
      //   // }


      // })

      console.log('expired', this.authService.isExpired());

      if (!this.authService.isExpired()) {
        console.log('toolbar - currentUser', localStorage.getItem('currentUser'));

        if (localStorage.getItem('currentUser')) {
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

          console.log('toolbar - ', this.currentUser);
          // console.log('toolbar - ', this.currentUser);
          this.userName = this.currentUser.username;
          this.accessLevel = this.currentUser.accessLevel;

          console.log('toolbar - this.accessLevel', this.accessLevel);

          if (this.accessLevel > 1) {
            this.IsDirector = true;

            // this.directorService.changeMessage(this.IsDirector)
          } else {
            this.IsDirector = false;

            // this.directorService.changeMessage(this.IsDirector)
          }

          this.getOrganizations();
        }
      }


      console.log('end of ngoninit');

      this.checkLoggedIn();
    }

    checkLoggedIn() {
      console.log('toolbar - checkLoggedIn');

      if (!this.authService.isExpired()) {
        console.log('currentUser', localStorage.getItem('currentUser'));

        if (localStorage.getItem('currentUser')) {
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

          console.log(this.currentUser.username);
          this.userName = this.currentUser.username;
          this.accessLevel = this.currentUser.accessLevel;

          if (this.accessLevel > 1) {
            this.IsDirector = true;

          // this.directorService.changeMessage(this.IsDirector)
          } else {
            this.IsDirector = false;

          // this.directorService.changeMessage(this.IsDirector)
          }

        // this.getOrganizations();
        }

        this.LoggedIn = true;
      }
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
      // TODO: toggle sidebar
      console.log('toggleSidebarOpen ');
      console.log('this.fuseSidebarService ', this.fuseSidebarService);
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

    // check if user is in an organization
    getOrganizations() {
      console.log('get organizations');

      this.getUserService.getUserbyUsername(this.userName)
        .subscribe(
          (user) => {
            console.log('user', user);

            if (user.length > 0) {
              if (user[0].organizations.length > 0) {
                this.organizations = user[0].organizations;

                console.log('this.organizations', this.organizations);

                this.InOrganization = true;

                this.inOrg.changeMessage(true);
              } else {
                console.log('not in any organizations');

                this.InOrganization = false;

                this.inOrg.changeMessage(false);
              }
            } else {
              console.log('no user');
            }
          },
        );
    }// end of getOrganizations

    // createOrg() {

    //   console.log('clicked on createOrg');

    //   this.openCreateOrgDialog();

    // }

    createOrg() {
      console.log('create organization');
      this.router.navigate(['/pages/create-organization']);

      // modal
      // this.openCreateOrgDialog();
    }

    // openCreateOrgDialog(): void {
    //   const dialogRef = this.dialog.open(CreateOrganizationHeaderComponent, {
    //     width: '250px',
    //     data: {},
    //   });

    //   dialogRef.afterClosed().subscribe((result) => {
    //     console.log('The dialog was closed'); // debug
    //     // console.log('result', result); //debug
    //   });
    // }

    viewOrgs() {
      console.log('clicked on view Orgs');

      this.router.navigate(['/pages/view-organizations']);
    }
}
