import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grant } from './grant';
import { GrantApiService } from './grant-api.service';

@Injectable()
export class GrantService {
  constructor(
    private grantapi: GrantApiService,
  ) {
  }

  // // Simulate POST /grant
  // addTodo(grant: Grant): Observable<Grant> {
  //   return this.grantapi.createGrant(grant);
  // }

  // // Simulate DELETE /grant/:id
  // deleteGrantById(grantId: number): Observable<Grant> {
  //   return this.grantapi.deleteGrantById(grantId);
  // }

  // // Simulate PUT /grant/:id
  // updateGrant(grant: Grant): Observable<Grant> {
  //   return this.grantapi.updateGrant(grant);
  // }

  // Simulate GET /grant
  getAllGrants(): Observable<Grant[]> {
    return this.grantapi.getAllGrants();
  }

  getGrantsByYear(year: number): Observable<Grant[]> {
    console.log('grants service - getGrantsByYear');
    return this.grantapi.getGrantsByYear(year);
  }

  getGrantsTotal(): Observable<any> {
    return this.grantapi.getGrantsTotal();
  }

  getGrantsCount(): Observable<any> {
    return this.grantapi.getGrantsCount();
  }

  // // Simulate GET /grant/:id
  // getGrantById(grantId: number): Observable<Grant> {
  //   return this.grantapi.getGrantById(grantId);
  // }

  // // Toggle complete
  // toggleGrantComplete(grant: Grant) {
  //   grant.complete = !grant.complete;
  //   return this.grantapi.updateGrant(grant);
  // }
}
