import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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

// Directives
// import { PhoneMaskDirective } from './directives/phone-mask.directive';

import { ErrorInterceptor } from './auth/error.interceptor';
import { JwtInterceptor } from './auth/jwt.interceptor';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';

// sample - use for new modules
import { SampleModule } from 'app/main/sample/sample.module';

import { HomeModule } from 'app/main/home/home.module';
import { UsersModule } from 'app/main/users/users.module';
import { SettingsModule } from 'app/main/settings/settings.module';
import { AboutModule } from 'app/main/about/about.module';
import { ApplicationModule } from 'app/main/application/application.module';
import { ContactModule } from 'app/main/contact/contact.module';
import { GrantsAwardedModule } from 'app/main/grants-awarded/grants-awarded.module';

import { AdminModule } from 'app/main/admin/admin.module';

import { AppRoutingModule } from './app-routing.module';

import { NotFoundComponent } from './utilities/not-found/not-found.component';
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
    NotFoundComponent,
    // PhoneMaskDirective,
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
    MatProgressSpinnerModule,
    MatSnackBarModule,

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
    GrantsAwardedModule,
    ContactModule,
    AdminModule,
  ],
  exports: [
    // PhoneMaskDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
