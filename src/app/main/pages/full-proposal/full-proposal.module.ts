import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { FullProposalComponent } from './full-proposal.component';
import { CreateFullProposalComponent } from './create-full-proposal/create-full-proposal.component';
import { FullProposalStatusComponent } from './full-proposal-status/full-proposal-status.component';
import { FullProposalSubmitComponent } from './full-proposal-submit/full-proposal-submit.component';
import { FullProposalSubmitCheckComponent } from './full-proposal-submit-check/full-proposal-submit-check.component';
import { CreateFullProposalItemComponent } from './create-full-proposal-item/create-full-proposal-item.component';
import { CreateFullProposalItemsComponent } from './create-full-proposal-items/create-full-proposal-items.component';
import { DeleteFullProposalItemComponent } from './delete-full-proposal-item/delete-full-proposal-item.component';
import { EditFullProposalItemComponent } from './edit-full-proposal-item/edit-full-proposal-item.component';

const routes = [
  // TODO
  {
    path: 'full-proposal',
    component: FullProposalComponent,
  },
  { path: 'fp/:id', component: FullProposalComponent },
  // , canActivate: [AuthGuard] },
  { path: 'create-fp-full/:orgID/:loiID', component: CreateFullProposalComponent },
  // , canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    FullProposalComponent,
    CreateFullProposalComponent,
    FullProposalStatusComponent,
    FullProposalSubmitComponent,
    FullProposalSubmitCheckComponent,
    CreateFullProposalItemComponent,
    CreateFullProposalItemsComponent,
    DeleteFullProposalItemComponent,
    EditFullProposalItemComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,

    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
  ],
  exports: [
    FullProposalComponent,
  ],
  entryComponents: [
    CreateFullProposalItemComponent,
    DeleteFullProposalItemComponent,
    EditFullProposalItemComponent,
  ],
})

export class FullProposalModule {
}
