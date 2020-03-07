import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';

import { FuseSharedModule } from '@fuse/shared.module';

import { FullProposalModule } from '../full-proposal/full-proposal.module';

// guards
import { AuthGuard } from '../../../auth/_guards/auth.guard';

// director
import { DirectorsMenuComponent } from './directors-menu/directors-menu.component';
import { DirectorOrganizationsComponent } from './director-organizations/director-organizations.component';
import { DirectorSelectedOrganizationComponent } from './director-organizations/director-selected-organization/director-selected-organization.component';

import { DirectorViewOrganizationComponent } from './director-organizations/director-view-organization/director-view-organization.component';
import { DirectorViewOrganizationInfoComponent } from './director-organizations/director-view-organization/director-view-organization-info/director-view-organization-info.component';
import { DirectorViewOrganizationLoisComponent } from './director-organizations/director-view-organization/director-view-organization-lois/director-view-organization-lois.component';
import { DirectorViewOrganizationDoc501c3Component } from './director-organizations/director-view-organization/director-view-organization-doc501c3/director-view-organization-doc501c3.component';
import { Validate501c3CheckComponent } from './director-organizations/director-view-organization/director-view-organization-doc501c3/validate501c3-check/validate501c3-check.component';

import { DirectorOrgSelectedLetterOfIntentComponent } from './director-organizations/director-view-organization/director-view-organization-lois/director-org-selected-letter-of-intent/director-org-selected-letter-of-intent.component';
import { DirectorOrgViewLetterOfIntentComponent } from './director-organizations/director-view-organization/director-view-organization-lois/director-org-view-letter-of-intent/director-org-view-letter-of-intent.component';
import { DirectorOrgViewLetterOfIntentInfoComponent } from './director-organizations/director-view-organization/director-view-organization-lois/director-org-view-letter-of-intent/director-org-view-letter-of-intent-info/director-org-view-letter-of-intent-info.component';
import { DirectorOrgViewLetterOfIntentStatusComponent } from './director-organizations/director-view-organization/director-view-organization-lois/director-org-view-letter-of-intent/director-org-view-letter-of-intent-status/director-org-view-letter-of-intent-status.component';
import { DirectorOrgLoiVotingComponent } from './director-organizations/director-view-organization/director-view-organization-lois/director-org-view-letter-of-intent/director-org-loi-voting/director-org-loi-voting.component';
import { DirectorOrgLoiPresidentVotingComponent } from './director-organizations/director-view-organization/director-view-organization-lois/director-org-view-letter-of-intent/director-org-loi-president-voting/director-org-loi-president-voting.component';
import { DirectorOpenFullProposalComponent } from './director-organizations/director-view-organization/director-view-organization-lois/director-org-view-letter-of-intent/director-open-full-proposal/director-open-full-proposal.component';

import { DirectorLoisComponent } from './director-lois/director-lois.component';
import { DirectorSelectedLoiComponent } from './director-lois/director-selected-loi/director-selected-loi.component';

import { LoiListComponent } from './director-lois/loi-list/loi-list.component';

import { DirectorFpsComponent } from './director-fps/director-fps.component';
import { DirectorTableFullProposalsComponent } from './director-fps/director-table-full-proposals/director-table-full-proposals.component';
import { DirectorSelectedFPComponent } from './director-fps/director-table-full-proposals/director-selected-fp/director-selected-fp.component';
import { DirectorViewFPComponent } from './director-fps/director-view-fp/director-view-fp.component';

import { DirectorFpsListComponent } from './director-fps/director-fps-list/director-fps-list.component';


const routes = [
  { path: 'director', component: DirectorsMenuComponent, canActivate: [AuthGuard] },
  { path: 'director/organizations', component: DirectorOrganizationsComponent, canActivate: [AuthGuard] },
  { path: 'director/lois', component: DirectorLoisComponent, canActivate: [AuthGuard] },
  { path: 'director/fullproposals', component: DirectorFpsComponent, canActivate: [AuthGuard] },
  { path: 'director/users', component: DirectorsMenuComponent, canActivate: [AuthGuard] },
  { path: 'director-organization/:id', component: DirectorViewOrganizationComponent, canActivate: [AuthGuard] },
  { path: 'director-loi/:id', component: DirectorOrgViewLetterOfIntentComponent, canActivate: [AuthGuard] },
  { path: 'director-fp/:id', component: DirectorViewFPComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [

    DirectorFpsComponent,

    DirectorLoisComponent,

    DirectorOrganizationsComponent,

    DirectorsMenuComponent,

    DirectorFpsListComponent,

    DirectorTableFullProposalsComponent,

    DirectorViewFPComponent,

    DirectorSelectedFPComponent,

    DirectorSelectedLoiComponent,

    LoiListComponent,

    DirectorSelectedOrganizationComponent,

    DirectorViewOrganizationComponent,

    DirectorViewOrganizationDoc501c3Component,

    DirectorViewOrganizationInfoComponent,

    DirectorViewOrganizationLoisComponent,

    Validate501c3CheckComponent,

    DirectorOrgSelectedLetterOfIntentComponent,

    DirectorOrgViewLetterOfIntentComponent,

    DirectorOpenFullProposalComponent,

    DirectorOrgLoiPresidentVotingComponent,

    DirectorOrgLoiVotingComponent,

    DirectorOrgViewLetterOfIntentInfoComponent,

    DirectorOrgViewLetterOfIntentStatusComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,

    // angular material
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatSliderModule,

    FullProposalModule,

  ],
  providers: [
  ],
  exports: [
  ],
  entryComponents: [

  ],
})

export class DirectorModule {
}
