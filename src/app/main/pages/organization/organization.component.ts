import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GetOrganizationService } from '../../../services/organization/get-organization.service';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';

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
}
