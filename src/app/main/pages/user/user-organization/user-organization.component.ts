import {
  Component, ViewChild, OnInit, Input,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { GetUserService } from '../../../../services/user/get-user.service';
import { InOrgService } from '../../../../services/user/in-org.service'; // organization cross components

import { CreateOrganizationComponent } from '../../organization/create-organization/create-organization.component';
import { SelectedOrganizationComponent } from './selected-organization/selected-organization.component';

@Component({
  selector: 'app-user-organization',
  templateUrl: './user-organization.component.html',
  styleUrls: ['./user-organization.component.scss'],
})
export class UserOrganizationComponent implements OnInit {
  // displayedColumns = ['id', 'name', 'progress', 'color'];
  displayedColumns = ['name', 'createdOn'];

  dataSource: MatTableDataSource<OrganizationData>;

  InOrganization = false;

  @Input()
  user: any;

  @Input()
  organizations: any;

  userName: any; // string

  orgName: any;

  // string
  description: any;

  inOrgCheck: boolean;

  Loaded: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public getUserService: GetUserService,
    private router: Router,
    public dialog: MatDialog,
    private inOrg: InOrgService,
  ) {
    this.Loaded = false;

    // // Create 100 organizations
    // const organizations: OrganizationData[] = [];
    // for (let i = 1; i <= 100; i++) { organizations.push(createNewOrganization(i)); }

    // // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(organizations);
  }

  ngOnInit() {
    this.inOrg.currentInOrg.subscribe((message) => { this.inOrgCheck = message; });

    console.log('user-organization - setting username', this.user);
    this.userName = this.user.username;
    console.log('user-organization - username', this.userName);
    // this.getUserName();

    if (!this.user) {
      console.log('user-org - kick out user');
      this.router.navigate(['/pages/auth/logout']);
    }

    this.dataSource = new MatTableDataSource([]);

    // console.log('user-organizaiton - check organizations 2');
    this.checkOrganizations();
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  // ngAfterViewInit() {

  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(filterValue: string) {
    let filteredValue = filterValue.trim(); // Remove whitespace
    filteredValue = filteredValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filteredValue;
  }

  getUser() {
    console.log('user LOI - getUser');

    console.log('user LOI - currentUser', JSON.parse(localStorage.getItem('currentUser')).user);

    this.getUserService.getUserbyID(this.user.id)
      .subscribe(() => {
        // pass in the user to the check functions
        this.checkOrganizations();
      });
  }

  // checks if user is in any organizations
  checkOrganizations() {
    console.log('user-organizaiton - check organizations', this.user.id);

    // will return the organizations
    this.getUserService.getUserbyID(this.user.id)
      .subscribe(
        (user) => {
          console.log('user-organization - checkOrganizations - user', user);

          const organization = user[0].organizations;

          if (organization && organization.length > 0) {
            this.InOrganization = true;

            console.log('user-organizations - organization list ', organization);

            this.dataSource = new MatTableDataSource(organization);

            console.log('debug - user-organizations - organization list ', this.dataSource);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            console.log('after dataSource paginator - user-organizations - organization list ', this.dataSource);

            this.inOrg.changeMessage(true);

            this.Loaded = true;
          } else {
            // no organizations
            console.log('not in any organizations');

            this.InOrganization = false;

            this.Loaded = true;
          }
        },
      );
  }// end of checkOrganization

  createOrganization() {
    console.log('create organization');
    this.router.navigate(['/pages/create-organization']);

    // modal
    // this.openCreateOrgDialog();
  }

  // old
  openCreateOrgDialog(): void {
    const dialogRef = this.dialog.open(CreateOrganizationComponent, {
      width: '250px',
      data: { name: this.orgName, description: this.description },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed'); // debug
      // maybe pull the organizations again
      console.log('result', result); // debug

      this.checkOrganizations();
    });
  }

  // this might be kept
  openSelectedOrgDialog(org): void {
    console.log('org.organizationID', org.organizationID);

    const dialogRef = this.dialog.open(SelectedOrganizationComponent, {
      width: '400px',
      data: { name: org.name, orgID: org.organizationID },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed'); // debug
      console.log('result', result); // debug
    });
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);

    this.openSelectedOrgDialog(row); // pass in the org from row object
  }

  newMessage() {
    this.inOrg.changeMessage(false);
  }
}// end of component

// // old
// /** Builds and returns a new Organization. */
// function createNewOrganization(id: number): OrganizationData {
//   const name = `${NAMES[Math.round(Math.random() * (NAMES.length - 1))]} ${
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0)}.`;

//   return {
//     id: id.toString(),
//     name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
//   };
// }

// // old
// /** Constants used to fill up our data base. */
// const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
//   'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
// const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
//   'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
//   'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

// old
export interface OrganizationData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
