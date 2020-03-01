import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { GetOrganizationService } from '../../../../services/organization/get-organization.service';
import { DirectorSelectedOrganizationComponent } from './director-selected-organization/director-selected-organization.component';

@Component({
  selector: 'app-director-organizations',
  templateUrl: './director-organizations.component.html',
  styleUrls: ['./director-organizations.component.scss'],
})
export class DirectorOrganizationsComponent implements OnInit {
  organizations: any;

  displayedColumns = ['name', 'createdOn', 'users', 'lois'];

  dataSource: MatTableDataSource<OrganizationData>;

  Loaded: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  pageEvent: PageEvent;

  constructor(public getOrgService: GetOrganizationService, public dialog: MatDialog) {
    this.Loaded = false;
  }

  ngOnInit() {
    this.getOrganizations();
  }

  getOrganizations() {
    this.getOrgService.getAllOrgs()
      .subscribe(
        (orgs) => {
          console.log('orgs', orgs);

          this.organizations = orgs;
          this.organizations.forEach((org) => {
            console.log('org.users', org.users.length);
            console.log('org.lois', org.lois.length);
          });

          this.dataSource = new MatTableDataSource(this.organizations);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.Loaded = true;
        },
      );
  }

  applyFilter(filterValue: string) {
    let filteredValue = filterValue.trim(); // Remove whitespace
    filteredValue = filteredValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filteredValue;
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);

    this.openSelectedOrgDialog(row); // pass in the org from row object
  }

  openSelectedOrgDialog(org): void {
    console.log('org.organizationID', org.organizationID);

    const dialogRef = this.dialog.open(DirectorSelectedOrganizationComponent, {
      width: '400px',
      data: { org },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed'); // debug
      console.log('result', result); // debug
    });
  }

  func($event) {
    console.log('event', $event);
  }
}

// old
export interface OrganizationData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
