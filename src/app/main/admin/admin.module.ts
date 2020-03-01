import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

// guards
import { AuthGuard } from '../../auth/_guards/auth.guard';

import { MatCardModule } from '@angular/material/card';

import { AdminComponent } from './admin.component';
import { AdminFullProposalComponent } from './admin-full-proposal/admin-full-proposal.component';
import { SubmissionYearComponent } from './submission-year/submission-year.component';

const routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminFullProposalComponent,
    SubmissionYearComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,

    MatCardModule,

  ],
  exports: [
    AdminComponent,
  ],
})

export class SampleModule {
}
