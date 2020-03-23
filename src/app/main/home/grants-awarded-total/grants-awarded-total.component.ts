import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../auth/auth.service';
import { GrantService } from '../../../services/grants/grant.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-grants-awarded-total',
  templateUrl: './grants-awarded-total.component.html',
  styleUrls: ['./grants-awarded-total.component.scss'],
})
export class GrantsAwardedTotalComponent implements OnInit {
  grantTotal: number;

  grantCount: number;

  API: string;

  constructor(private grantService: GrantService,
    private authService: AuthService) {
    // console.log('initialize the ba')
    this.getBackendURL();
    this.getGrantsTotal();
    this.getGrantsCount();
  }

  ngOnInit(): void {
    this.getBackendURL();
    this.getGrantsTotal();
    this.getGrantsCount();
  }

  // gets Grants Total
  getGrantsTotal(): void {
    console.log('getGrantsTotal');
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
    console.log('getGrantsCount');
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

  getBackendURL(): void {
    console.log('GrantsAwardedTotalComponent - environment', environment);
    if (environment.production) {
      console.log('GrantsAwardedTotalComponent - environment is production');
      this.authService.initializeBackendURL().subscribe(
        (backendUrl) => {
          console.log('GrantsAwardedTotalComponent - backendUrl', backendUrl.url);

          if (backendUrl) {
            sessionStorage.setItem('backend_url', backendUrl.url);
          } else {
            console.log('Can´t find the backend URL, using a failover value');
            sessionStorage.setItem('backend_url', 'https://failover-url.com');
          }

          this.API = backendUrl.url;
        },
      );
    }
  }
}
