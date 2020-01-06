import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SlideshowModule } from 'ng-simple-slideshow';

import { HomeComponent } from './home.component';
import { GrantsAwardedTotalComponent } from './grants-awarded-total/grants-awarded-total.component';

const routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    GrantsAwardedTotalComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,
    MatGridListModule,

    SlideshowModule,

  ],
  exports: [
    HomeComponent,
  ],
})

export class HomeModule {
}
