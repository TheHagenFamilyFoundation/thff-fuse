import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GetOrganizationService } from '../../../../../services/organization/get-organization.service';

@Component({
  selector: 'app-director-view-organization',
  templateUrl: './director-view-organization.component.html',
  styleUrls: ['./director-view-organization.component.css'],
})
export class DirectorViewOrganizationComponent implements OnInit {
  org: any;

  orgName: string;

  orgID: string;

  organizationID: string;

  // check basic row height
  basicRowHeight = 500;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public getOrgService: GetOrganizationService) {
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

          [this.org] = org; // should pull the last
          this.orgName = this.org.name;

          this.organizationID = this.org.id;
        },
      );
  }
}
