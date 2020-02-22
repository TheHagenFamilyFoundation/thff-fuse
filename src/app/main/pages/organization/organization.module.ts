import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';

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
  ],
  exports: [
    OrganizationComponent,
  ],
})

export class OrganizationModule {
}
