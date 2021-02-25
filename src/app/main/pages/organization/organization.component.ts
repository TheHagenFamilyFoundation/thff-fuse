import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GetOrganizationService } from '../../../services/organization/get-organization.service';
import { AuthService } from '../../../auth/auth.service';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  orgID: any;

  organizationID: any;

  org: any; // the Organization object

  // check basic row height
  // TODO
  basicRowHeight = 450;

  /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} fuseTranslationLoaderService
     */
  constructor(
    private fuseTranslationLoaderService: FuseTranslationLoaderService,
    private route: ActivatedRoute,
    private router: Router,
    public getOrgService: GetOrganizationService,
    public authService: AuthService,
  ) {
    this.fuseTranslationLoaderService.loadTranslations(english, turkish);

    this.route.params.subscribe((params) => {
      console.log(params);
      this.orgID = params.id;
    });
  }

  ngOnInit() {
    console.log('orgID', this.orgID);

    this.getOrganization(this.orgID);
  }

  getOrganization(orgID) {
    console.log('check organizations');

    // query database for that organization

    this.getOrgService.getOrgbyID(orgID)
      .subscribe(
        (org) => {
          console.log('org', org);

          this.org = org[0];

          this.organizationID = this.org.id;
        },
      );
  }

  getBackendURL() {
    console.log('organization - environment', environment);
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

          // this.API = backendUrl.url;
          // this.LoadedAPI = true;
        },
      );
    }
  }
}
