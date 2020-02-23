import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

// Organization
import { GetOrganizationService } from '../../../services/organization/get-organization.service';
import { CreateOrganizationService } from '../../../services/organization/create-organization.service';

// Components
import { OrganizationComponent } from './organization.component';
import { CreateOrganizationComponent } from './create-organization/create-organization.component'; // old
import { CreateOrganizationFullComponent } from './create-organization-full/create-organization-full.component';

import { NgxCurrencyModule } from 'ngx-currency';

import { PhoneMaskDirective } from '../../../directives/phone-mask.directive';
import { OrganizationInfoComponent } from './organization-info/organization-info.component';
import { OrganizationUsersComponent } from './organization-users/organization-users.component';
import { OrganizationRequestsComponent } from './organization-requests/organization-requests.component';
import { OrganizationDoc501c3Component } from './organization-doc501c3/organization-doc501c3.component';
import { OrganizationFullProposalsComponent } from './organization-full-proposals/organization-full-proposals.component';

const routes = [
  {
    path: 'organization/:id',
    component: OrganizationComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'create-organization',
    component: CreateOrganizationFullComponent,
  },
];

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  allowZero: true,
  decimal: '.',
  precision: 2,
  prefix: '$',
  suffix: '',
  thousands: ',',
  nullable: false,
};

@NgModule({
  declarations: [
    OrganizationComponent,
    CreateOrganizationComponent,
    CreateOrganizationFullComponent,

    PhoneMaskDirective,

    OrganizationInfoComponent,

    OrganizationUsersComponent,

    OrganizationRequestsComponent,

    OrganizationDoc501c3Component,

    OrganizationFullProposalsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,

    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,

    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
  providers: [
    CreateOrganizationService, GetOrganizationService,
  ],
  exports: [
    OrganizationComponent, PhoneMaskDirective,
  ],
})

export class OrganizationModule {
}
