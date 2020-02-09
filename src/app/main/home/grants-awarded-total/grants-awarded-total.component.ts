import { Component, OnInit } from '@angular/core';

import { GrantService } from '../../../services/grants/grant.service';

@Component({
  selector: 'app-grants-awarded-total',
  templateUrl: './grants-awarded-total.component.html',
  styleUrls: ['./grants-awarded-total.component.scss'],
})
export class GrantsAwardedTotalComponent implements OnInit {
  grantTotal: number;

  grantCount: number;

  constructor(private grantService: GrantService) {
    this.getGrantsTotal();
    this.getGrantsCount();
  }

  ngOnInit() {
    this.getGrantsTotal();
    this.getGrantsCount();
  }

  // gets Grants Total
  getGrantsTotal(): void {
    this.grantService
      .getGrantsTotal()
      .subscribe(
        (gt) => {
          // returning grant total
          console.log('gt', gt);

          // round to the hundred thousand
          this.grantTotal = gt.grantTotal / 1000000;
          this.grantTotal = Math.round(this.grantTotal * 10) / 10;
        },
      );
  }

  // get Grants Count
  getGrantsCount(): void {
    this.grantService
      .getGrantsCount()
      .subscribe(
        (gc) => {
          // returning grant count
          console.log('gc', gc);

          this.grantCount = gc.grantCount;
        },
      );
  }
}
