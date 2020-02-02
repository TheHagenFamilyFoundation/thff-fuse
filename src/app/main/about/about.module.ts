import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

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
  ],
  exports: [
    AboutComponent,
  ],
})

export class AboutModule {
}
