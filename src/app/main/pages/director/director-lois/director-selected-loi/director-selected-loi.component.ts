import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-director-selected-loi',
  templateUrl: './director-selected-loi.component.html',
  styleUrls: ['./director-selected-loi.component.scss'],
})
export class DirectorSelectedLoiComponent implements OnInit {
  loiLink = '/pages/director-loi/'

  link: string;

  loiID: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) {
    console.log('director-selected-loi constructor');
  }

  ngOnInit() {
    // will log the entire data object
    console.log('this.data', this.data);

    this.loiID = this.data.loiID;

    this.link = this.loiLink + this.data.loiID;

    console.log('this is the link', this.link);
  }

  routeToLOI() {
    this.router.navigate([this.link], { queryParams: { filter: this.data.currentFilter } });
  }

  cancel() {
    console.log('cancel pressed');
  }
}
