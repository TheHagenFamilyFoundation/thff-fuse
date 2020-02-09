import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
// used in about
import { MatListModule } from '@angular/material/list';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SlideshowModule } from 'ng-simple-slideshow';

import { GetUserService } from '../../services/user/get-user.service'; // used for getting organizations
import { InOrgService } from '../../services/user/in-org.service';
import { DirectorService } from '../../services/user/director.service';

import { GrantService } from '../../services/grants/grant.service';
import { GrantApiService } from '../../services/grants/grant-api.service';

import { HomeComponent } from './home.component';
import { GrantsAwardedTotalComponent } from './grants-awarded-total/grants-awarded-total.component';
import { GrantsSinceComponent } from './grants-since/grants-since.component';
import { AboutStatesComponent } from './about-states/about-states.component';

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
    AboutStatesComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,

    MatGridListModule,
    MatButtonModule,
    MatListModule,

    SlideshowModule,

  ],
  providers: [
    GetUserService, InOrgService, DirectorService,


    GrantService, GrantApiService,

  ],
  exports: [
    HomeComponent,
  ],
})

export class HomeModule {
}
