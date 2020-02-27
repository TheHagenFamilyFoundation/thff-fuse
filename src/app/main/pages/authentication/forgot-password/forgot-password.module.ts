import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
// import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FuseSharedModule } from '@fuse/shared.module';

import { ResetCodeService } from '../../../../services/user/reset-code.service';
import { ValidEmailService } from '../../../../services/user/valid-email.service';
import { ValidUserNameService } from '../../../../services/user/valid-username.service';
import { ValidResetCodeService } from '../../../../services/user/valid-resetcode.service';
import { SetNewPasswordService } from '../../../../services/user/set-new-password.service';

import { ForgotPasswordComponent } from 'app/main/pages/authentication/forgot-password/forgot-password.component';
// import { TypeNewPasswordComponent } from './type-new-password/type-new-password.component';

const routes = [
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
  },

];

@NgModule({
  declarations: [
    ForgotPasswordComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    // MatSnackBarModule,

    FuseSharedModule,
  ],
  providers: [
    ResetCodeService,
    ValidEmailService,
    ValidUserNameService,
    ValidResetCodeService,
    SetNewPasswordService,
  ],
})
export class ForgotPasswordModule {
}
