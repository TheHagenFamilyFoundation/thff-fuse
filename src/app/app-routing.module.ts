import { NgModule, InjectionToken } from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot } from '@angular/router';

// guards
// import { AuthGuard } from './auth/_guards/auth.guard';

// Utility
import { NotFoundComponent } from './utilities/not-found/not-found.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [

  /** Maintenance */
  // {
  //   path: '**',
  //   redirectTo: 'pages/maintenance',
  // },


  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'contact', redirectTo: 'contact' },
  { path: 'about', redirectTo: 'about' },
  { path: 'application', redirectTo: 'application' },

  // TODO
  // { path: 'users', redirectTo: 'users', canActivate: [AuthGuard] },
  // { path: 'settings', redirectTo: 'settings' },
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then((m) => m.PagesModule),
  },

  {
    path: 'externalRedirect',
    resolve: {
      url: externalUrlProvider,
    },
    // We need a component here because we cannot define the route otherwise
    component: NotFoundComponent,
  },


  {
    path: '**',
    redirectTo: 'home',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
        const externalUrl = route.paramMap.get('externalUrl');
        window.open(externalUrl, '_self');
      },
    },
  ],
})
export class AppRoutingModule { }
