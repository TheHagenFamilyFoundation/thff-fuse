import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { GrantsAwardedComponent } from './grants-awarded.component';
import { GrantsByYearComponent } from './grants-by-year/grants-by-year.component';

const routes = [
  {
    path: 'grants-awarded',
    component: GrantsAwardedComponent,
  },
];

@NgModule({
  declarations: [
    GrantsAwardedComponent,
    GrantsByYearComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,
  ],
  exports: [
    GrantsAwardedComponent,
  ],
})

export class GrantsAwardedModule {
}
