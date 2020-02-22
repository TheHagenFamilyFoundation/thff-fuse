import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

// Organization
import { GetOrganizationService } from '../../../services/organization/get-organization.service';
import { CreateOrganizationService } from '../../../services/organization/create-organization.service';

// Components
import { OrganizationComponent } from './organization.component';
import { CreateOrganizationComponent } from './create-organization/create-organization.component'; // old
import { CreateOrganizationFullComponent } from './create-organization-full/create-organization-full.component';

import { NgxCurrencyModule } from 'ngx-currency';

import { PhoneMaskDirective } from '../../../directives/phone-mask.directive';

const routes = [
  {
    path: 'organization',
    component: OrganizationComponent,
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
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,

    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,

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
