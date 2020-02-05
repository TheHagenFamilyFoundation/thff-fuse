import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { FuseSharedModule } from '@fuse/shared.module';

import { AboutComponent } from './about.component';

const routes = [
  {
    path: 'about',
    component: AboutComponent,
  },
];

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,

    MatGridListModule,
  ],
  exports: [
    AboutComponent,
  ],
})

export class AboutModule {
}
