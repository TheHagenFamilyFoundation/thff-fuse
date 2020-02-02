import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import {
  FuseProgressBarModule,
  FuseSidebarModule,
  FuseThemeOptionsModule,
} from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';

// sample - use for new modules
import { SampleModule } from 'app/main/sample/sample.module';

import { HomeModule } from 'app/main/home/home.module';
import { UsersModule } from 'app/main/users/users.module';
import { SettingsModule } from 'app/main/settings/settings.module';
import { AboutModule } from 'app/main/about/about.module';
import { ApplicationModule } from 'app/main/application/application.module';

import { AppRoutingModule } from './app-routing.module';
// import { SettingsComponent } from './main/settings/settings.component';

// const appRoutes: Routes = [
//     {
//         path      : '**',
//         redirectTo: 'sample'
//     }
// ];

@NgModule({
  declarations: [
    AppComponent,
    // SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    // RouterModule.forRoot(appRoutes),

    TranslateModule.forRoot(),

    // Material moment date module
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // App modules
    LayoutModule,
    SampleModule,
    HomeModule,
    UsersModule,
    SettingsModule,
    AboutModule,
    ApplicationModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
