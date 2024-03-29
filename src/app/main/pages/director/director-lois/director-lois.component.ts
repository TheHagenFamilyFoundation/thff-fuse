import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { GetLoiService } from '../../../../services/loi/get-loi.service';
import { LOIStatusService } from '../../../../services/loi/loi-status.service';
import { DirectorSelectedLoiComponent } from './director-selected-loi/director-selected-loi.component';

@Component({
  selector: 'app-director-lois',
  templateUrl: './director-lois.component.html',
  styleUrls: ['./director-lois.component.scss'],
})
export class DirectorLoisComponent implements OnInit {
  lois: any;

  user: any;

  userID: any;

  displayedColumns = ['name', 'org', 'createdOn', 'submitted', 'status', 'score'];

  dataSource: MatTableDataSource<LOIData>;

  Loaded: boolean;

  AllLOI: boolean;

  PresYes: boolean;

  PresNo: boolean;

  Pending: boolean;

  Ranked: boolean;

  Printable: boolean;

  currentFilter: number;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public getLoiService: GetLoiService,
    public dialog: MatDialog,
    private loiStatusService: LOIStatusService,
  ) {
    this.Loaded = false;
    this.AllLOI = true; // set to all initial
    this.PresYes = false;
    this.PresNo = false;
    this.Pending = false;
    this.Printable = false;

    this.currentFilter = 0; // initialize to 0 - All LOI
  }

  ngOnInit() {
    this.getLOIs();

    this.user = JSON.parse(localStorage.getItem('currentUser')).user;
    this.userID = this.user.id;
  }

  getLOIs() {
    this.Loaded = false;

    this.setButtons(0);

    this.getLoiService.getAllLOIs()
      .subscribe(
        (lois) => {
          console.log('lois', lois);

          this.lois = lois;

          this.setStatuses();

          this.dataSource = new MatTableDataSource(this.lois);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.Loaded = true;
        },
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);

    console.log('currentFilter', this.currentFilter);

    this.openSelectedLOIDialog(row); // pass in the org from row object
  }

  openSelectedLOIDialog(loi): void {
    const dialogRef = this.dialog.open(DirectorSelectedLoiComponent, {
      width: '400px',
      data: { name: loi.name, loiID: loi.loiID, currentFilter: this.currentFilter },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed'); // debug
      console.log('result', result); // debug
    });
  }

  setStatuses() {
    console.log('setting status');

    this.lois.forEach((loi) => {
      console.log('before LOI', loi);

      console.log('status', loi.status);

      loi.status = this.configureStatus(loi.status);

      console.log('after LOI', loi);
    });
  }

  // takes in a status s that is a number
  configureStatus(s: number): string {
    return this.loiStatusService.getStatus(s);
  }

  getPresVoting(vote) {
    if (vote === 1) {
      this.setButtons(1);
    } else {
      this.setButtons(2);
    }

    this.Loaded = false;

    this.getLoiService.getPresVotes(vote).subscribe(
      (lois) => {
        console.log('lois', lois);

        this.lois = lois;

        this.setStatuses();

        this.dataSource = new MatTableDataSource(this.lois);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.Loaded = true;
      },
    );
  }

  getPendingVoteLOIs() {
    this.setButtons(3);

    this.Loaded = false;

    const user = this.userID;

    this.getLoiService.getPendingVotes(user).subscribe(
      (lois) => {
        console.log('lois', lois);

        this.lois = lois;

        this.setStatuses();

        this.dataSource = new MatTableDataSource(this.lois);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.Loaded = true;
      },
    );
  }

  getRankedLOIs() {
    this.setButtons(4);

    this.Loaded = false;

    this.getLoiService.getRankedLOIs().subscribe(
      (lois) => {
        console.log('lois', lois);

        this.lois = lois;

        this.setStatuses();

        this.dataSource = new MatTableDataSource(this.lois);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.Loaded = true;
      },
    );
  }

  getPrintable() {
    console.log('printable');

    this.Printable = true;

    this.Loaded = false;

    this.toggleGet();
    // setTimeout(() => { this.Loaded = true; }, 1000)
  }

  getTable() {
    this.Printable = false;

    this.Loaded = false;

    this.toggleGet();

    // setTimeout(() => { this.Loaded = true; }, 1000)
  }

  toggleGet(): void {
    switch (this.currentFilter) {
      case 0:
        this.getLOIs();
        break;
      case 1:
        this.getPresVoting(this.currentFilter);
        break;
      case 2:
        this.getPresVoting(this.currentFilter);
        break;
      case 3:
        this.getPendingVoteLOIs();
        break;
      case 4:
        this.getRankedLOIs();
        break;
      default:
        this.getLOIs();
    }
  }

  setButtons(numButton): void {
    // all to false
    this.AllLOI = false; // set to all initial
    this.PresYes = false;
    this.PresNo = false;
    this.Pending = false;
    this.Ranked = false;

    switch (numButton) {
      case 0:
        this.AllLOI = true; // set to all initial
        this.currentFilter = 0;
        break;
      case 1:
        this.PresYes = true;
        this.currentFilter = 1;
        break;
      case 2:
        this.PresNo = true;
        this.currentFilter = 2;
        break;
      case 3:
        this.Pending = true;
        this.currentFilter = 3;
        break;
      case 4:
        this.Ranked = true;
        this.currentFilter = 4;
        break;
      default:
        this.AllLOI = true;
        this.currentFilter = 0;
    }
  }
}

// old
export interface LOIData {
  id: string;
  name: string;
  organization: string;
  createdAt: Date;
  submitted: string;
  status: string;
  score: number;
}
