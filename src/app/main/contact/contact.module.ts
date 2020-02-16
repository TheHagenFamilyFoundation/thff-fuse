import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { FuseSharedModule } from '@fuse/shared.module';

import { ContactComponent } from './contact.component';

const routes = [
  {
    path: 'contact',
    component: ContactComponent,
  },
];

@NgModule({
  declarations: [
    ContactComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,

    MatGridListModule,
  ],
  exports: [
    ContactComponent,
  ],
})

export class ContactModule {
}
