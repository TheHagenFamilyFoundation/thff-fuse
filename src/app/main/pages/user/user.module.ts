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

import { FuseSharedModule } from '@fuse/shared.module';

import { ChangeEmailService } from '../../../services/user/change-email.service';
import { ChangePasswordService } from '../../../services/user/change-password.service';

import { UpdateUserService } from '../../../services/user/update-user.service';

import { UserComponent } from './user.component';
import { UserUpdateMainComponent } from './user-update-main/user-update-main.component';
import { UserUpdateComponent } from './user-update-main/user-update/user-update.component';
import { ChangePasswordComponent } from './user-update-main/change-password/change-password.component';
import { ChangeEmailComponent } from './user-update-main/change-email/change-email.component';
import { UserOrganizationComponent } from './user-organization/user-organization.component';
import { UserLetterOfIntentComponent } from './user-letter-of-intent/user-letter-of-intent.component';
import { SelectedOrganizationComponent } from './user-organization/selected-organization/selected-organization.component';
import { SelectedLetterOfIntentComponent } from './user-letter-of-intent/selected-letter-of-intent/selected-letter-of-intent.component';

import { CreateOrganizationFullComponent } from '../organization/create-organization-full/create-organization-full.component';

const routes = [
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'create-organization',
    component: CreateOrganizationFullComponent,
  },
];

@NgModule({
  declarations: [
    UserComponent,
    UserUpdateMainComponent,
    UserUpdateComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    UserOrganizationComponent,
    UserLetterOfIntentComponent,
    SelectedOrganizationComponent,
    SelectedLetterOfIntentComponent,

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

  ],
  providers: [
    ChangeEmailService,
    ChangePasswordService,

    UpdateUserService,
  ],
  exports: [
    UserComponent,
  ],
  entryComponents: [
    SelectedLetterOfIntentComponent,
  ],
})

export class UserModule {
}
