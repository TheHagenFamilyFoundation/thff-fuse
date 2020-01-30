import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SlideshowModule } from 'ng-simple-slideshow';

import { GrantService } from '../../services/grants/grant.service';
import { GrantApiService } from '../../services/grants/grant-api.service';

import { HomeComponent } from './home.component';
import { GrantsAwardedTotalComponent } from './grants-awarded-total/grants-awarded-total.component';
import { GrantsSinceComponent } from './grants-since/grants-since.component';
import { AboutComponent } from './about/about.component';

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
    GrantsSinceComponent,
    AboutComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,
    MatGridListModule,

    SlideshowModule,

  ],
  providers: [
    GrantService, GrantApiService,
  ],
  exports: [
    HomeComponent,
  ],
})

export class HomeModule {
}
