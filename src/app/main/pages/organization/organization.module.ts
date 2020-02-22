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
import { CreateOrganizationComponent } from './create-organization/create-organization.component';
import { CreateOrganizationFullComponent } from './create-organization-full/create-organization-full.component';

const routes = [
  {
    path: 'organization',
    component: OrganizationComponent,
  },
];

@NgModule({
  declarations: [
    OrganizationComponent,
    CreateOrganizationComponent,
    CreateOrganizationFullComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,

    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
  ],
  providers: [
    CreateOrganizationService, GetOrganizationService,
  ],
  exports: [
    OrganizationComponent,
  ],
})

export class OrganizationModule {
}
