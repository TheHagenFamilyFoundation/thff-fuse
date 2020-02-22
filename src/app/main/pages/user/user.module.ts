import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ChangeEmailService } from '../../../services/user/change-email.service';
import { ChangePasswordService } from '../../../services/user/change-password.service';

import { UpdateUserService } from '../../../services/user/update-user.service';

import { UserComponent } from './user.component';
import { UserUpdateMainComponent } from './user-update-main/user-update-main.component';
import { UserUpdateComponent } from './user-update-main/user-update/user-update.component';
import { ChangePasswordComponent } from './user-update-main/change-password/change-password.component';
import { ChangeEmailComponent } from './user-update-main/change-email/change-email.component';

const routes = [
  {
    path: 'user',
    component: UserComponent,
  },
];

@NgModule({
  declarations: [
    UserComponent,
    UserUpdateMainComponent,
    UserUpdateComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,

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

  ],
  providers: [
    ChangeEmailService,
    ChangePasswordService,

    UpdateUserService,
  ],
  exports: [
    UserComponent,
  ],
})

export class UserModule {
}
