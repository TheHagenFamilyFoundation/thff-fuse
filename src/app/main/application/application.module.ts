import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';

import { FuseSharedModule } from '@fuse/shared.module';

import { ApplicationComponent } from './application.component';

const routes = [
  {
    path: 'application',
    component: ApplicationComponent,
  },
];

@NgModule({
  declarations: [
    ApplicationComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,

    MatButtonModule,
  ],
  exports: [
    ApplicationComponent,
  ],
})

export class ApplicationModule {
}
