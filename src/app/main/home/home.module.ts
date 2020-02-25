import { NgModule } from '@angular/core';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { CountUpModule } from 'ngx-countup';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// used in about
import { MatListModule } from '@angular/material/list';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { GetUserService } from '../../services/user/get-user.service'; // used for getting organizations
import { InOrgService } from '../../services/user/in-org.service';
import { DirectorService } from '../../services/user/director.service';

import { GrantService } from '../../services/grants/grant.service';
import { GrantApiService } from '../../services/grants/grant-api.service';

import { HomeComponent } from './home.component';
import { GrantsAwardedTotalComponent } from './grants-awarded-total/grants-awarded-total.component';
import { GrantsSinceComponent } from './grants-since/grants-since.component';
import { AboutStatesComponent } from './about-states/about-states.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselCaptionComponent } from './carousel/carousel-caption/carousel-caption.component';
import { CarouselImageComponent } from './carousel/carousel-image/carousel-image.component';

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
    CarouselComponent,
    CarouselCaptionComponent,
    CarouselImageComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,

    MatGridListModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,

    // CountUpModule,
    // BrowserAnimationsModule,
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
