import {
  Component, ViewChild, OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { GetUserService } from '../../../../services/user/get-user.service';
import { InOrgService } from '../../../../services/user/in-org.service'; // organization cross components

import { CreateOrganizationComponent } from '../create-organization/create-organization.component';
import { SelectedOrganizationComponent } from '../../user/user-organization/selected-organization/selected-organization.component';

@Component({
  selector: 'app-view-organizations',
  templateUrl: './view-organizations.component.html',
  styleUrls: ['./view-organizations.component.scss'],
})
export class ViewOrganizationsComponent implements OnInit {
  // displayedColumns = ['id', 'name', 'progress', 'color'];
  displayedColumns = ['name', 'createdOn'];

  dataSource: MatTableDataSource<OrganizationData>;

  InOrganization = false;

  user: any;

  userName: any; // string

  orgName: any;

  // string
  description: any;

  inOrgCheck: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public getUserService: GetUserService,
    private router: Router,
    public dialog: MatDialog,
    private inOrg: InOrgService,
  ) {
    // // Create 100 organizations
    // const organizations: OrganizationData[] = [];
    // for (let i = 1; i <= 100; i++) { organizations.push(createNewOrganization(i)); }

    // // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(organizations);
  }

  ngOnInit() {
    this.inOrg.currentInOrg.subscribe((message) => this.inOrgCheck = message);

    this.getUserName();

    console.log('check organizations 2');
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

  getUserName() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.user = JSON.parse(localStorage.getItem('currentUser')).user;
      this.userName = this.user.username;

      console.log('check organizations 1');

      this.checkOrganizations();
    } else {
      // logout
      console.log('view org - kickout user');
      this.router.navigate(['/logout']);
    }
  }// end of getUserName

  // checks if user is in any organizations
  checkOrganizations() {
    console.log('check organizations');

    this.getUserService.getUserbyID(this.user.id)
      .subscribe(
        (user) => {
          console.log('user', user);

          const organization = user[0].organizations;

          if (organization.length > 0) {
            this.InOrganization = true;

            console.log('organization', organization);

            this.dataSource = new MatTableDataSource(organization);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            this.inOrg.changeMessage(true);
          } else {
            // no organizations
            console.log('not in any organizations');

            this.InOrganization = false;
          }
        },
      );
  }// end of checkOrganization

  createOrganization() {
    console.log('create organization');
    this.router.navigate(['/create-organization']);

    // modal
    // this.openCreateOrgDialog();
  }

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

// old
/** Builds and returns a new Organization. */
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

// old
/** Constants used to fill up our data base. */
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
