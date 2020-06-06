import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { AuthService } from '../../auth/auth.service';

// import { InterfaceImage } from './IImage';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

import { GetUserService } from '../../services/user/get-user.service'; // used for getting organizations
import { InOrgService } from '../../services/user/in-org.service';
import { DirectorService } from '../../services/user/director.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'Home'

  env: any;

  API: any;

  LoadedAPI: boolean;

  currentUser: any;

  user: any;

  userName: string;

  accessLevel: number; // debug

  InOrganization: boolean;

  inOrgCheck: boolean;

  IsDirector: boolean;

  organizations: any;

  /*
    Images
  */
  // fullImagePath = '../assets/images/thfflogo1.png'; // not working
  fullImagePath = '../assets/images/logos/logo_2020_9.svg';

  // fullImagePath2 = '../assets/images/cv_busses1.JPG';

  // fullImagePath3 = '../assets/images/southern_shakespeare.png';

  // fullImagePath4 = '../assets/images/family.png';

  // // fullImagePath5 = '../assets/images/grant_review_timeline.png';


  // // fullImagePath4 = '../assets/images/grant_review_timeline.png'; // april 15th

  // fullImagePath5 = '../assets/images/grant_review_timeline_july1.jpg';


  // public slides = [
  //   { src: this.fullImagePath2, caption: 'The Christus Victor pre-school children are happy with their new buses. View Grants Awarded Click Here' },
  //   { src: this.fullImagePath3, caption: 'Learn about our grant giving process and the requirements for submitting a grant request. Read More' },
  //   { src: this.fullImagePath4, caption: 'Apply Now' },
  //   { src: this.fullImagePath5, caption: 'The THFF Board of Directors contains two generations of family members. Learn more about us' },
  // ];

  // imageUrlArray: (string | InterfaceImage)[] = [
  //   {
  //     url: this.fullImagePath2,
  //     caption: 'The Christus Victor pre-school children are happy with their new buses. View Grants Awarded Click Here',
  //     //   `The Christus Victor pre-school children are happy with
  //     // their new buses. The Foundation was delighted to help
  //     // with their purchase (2009).`,
  //     href: '/grants-awarded', // test
  //   },
  //   {
  //     url: this.fullImagePath5,
  //     // caption: 'Grant Process',
  //     caption: 'Learn about our grant giving process and the requirements for submitting a grant request. Read More',
  //     href: '/application', // test
  //   },

  //   {
  //     url: this.fullImagePath3,
  //     caption: 'Apply Now',
  //     href: '/application', // test
  //   },

  //   {
  //     url: this.fullImagePath4,
  //     caption: 'The THFF Board of Directors contains two generations of family members. Learn more about us',
  //     href: '/about', // test
  //   },
  //   // EXAMPLES
  //   // { url: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg', clickAction: () => alert('custom click function') },
  //   // { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg', caption: 'Apple TV', href: 'https://www.apple.com/' },
  //   // 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56674755/mr_pb_is_the_best.0.jpg'
  // ]

  // // imageUrlArray = [this.fullImagePath2, this.fullImagePath2];
  // // imageUrlArray = [this.fullImagePath2, this.fullImagePath2];

  height = '400px';

  /**
  * Constructor
  *
  * @param {FuseTranslationLoaderService} fuseTranslationLoaderService
  */
  constructor(
    public authService: AuthService,
    private inOrg: InOrgService,
    private getUserService: GetUserService,
    private directorService: DirectorService,
    private fuseTranslationLoaderService: FuseTranslationLoaderService,
  ) {
    this.fuseTranslationLoaderService.loadTranslations(english, turkish);

    console.log('Home Constructor');

    this.getBackendURL();
    this.LoadedAPI = false;
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
      console.log('home - constructor - x', x);
      this.currentUser = x;
      if (this.currentUser && this.currentUser.user) {
        this.user = this.currentUser.user;
      } else {
        console.error('home component - no user');
      }
    });

    this.env = environment.envName;

    // if not production get the localhost from the environment file
    if (!environment.production) {
      this.API = environment.API_URL;
      this.LoadedAPI = true;
    }
    // else it doesn't need to be set

    console.log('this.authService.isExpired()', this.authService.isExpired());

    if (!this.authService.isExpired()) {
      console.log('currentUser', localStorage.getItem('currentUser'));

      if (localStorage.getItem('currentUser')) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser && this.currentUser.user) {
          this.user = this.currentUser.user;
        } else {
          console.error('home component - no user');
        }

        console.log('home component - username - ', this.user.username);
        this.userName = this.user.username;
        this.accessLevel = this.user.accessLevel;

        if (this.accessLevel > 1) {
          this.IsDirector = true;

          //   this.directorService.changeMessage(this.IsDirector)
        } else {
          this.IsDirector = false;

          //   this.directorService.changeMessage(this.IsDirector)
          //
        }

        this.getOrganizations();
      }
    }
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.getBackendURL();
    if (!this.authService.isExpired()) {
      console.log('home component - ngonInit - currentUser', localStorage.getItem('currentUser'));

      if (localStorage.getItem('currentUser')) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser && this.currentUser.user) {
          this.user = this.currentUser.user;
        } else {
          console.error('home component - no user');
        }

        console.log('home - currentUser username', this.user.username);
        this.userName = this.user.username;
        this.accessLevel = this.user.accessLevel;

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
  }// end of ngOnInit

  // check if user is in an organization
  getOrganizations() {
    console.log('home - get organizations');

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

  getBackendURL() {
    console.log('HomeComponent - environment', environment);
    if (environment.production) {
      console.log('environment is production');
      this.authService.initializeBackendURL().subscribe(
        (backendUrl) => {
          console.log('backendUrl', backendUrl.url);

          if (backendUrl) {
            sessionStorage.setItem('backend_url', backendUrl.url);
          } else {
            console.log('Can´t find the backend URL, using a failover value');
            sessionStorage.setItem('backend_url', 'https://failover-url.com');
          }

          this.API = backendUrl.url;
          this.LoadedAPI = true;
        },
      );
    }
  }
}
