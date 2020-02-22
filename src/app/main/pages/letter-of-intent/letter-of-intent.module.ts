import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { LetterOfIntentComponent } from './letter-of-intent.component';
import { LetterOfIntentInfoComponent } from './letter-of-intent-info/letter-of-intent-info.component';
import { LetterOfIntentStatusComponent } from './letter-of-intent-status/letter-of-intent-status.component';
import { CreateLetterOfIntentComponent } from './create-letter-of-intent/create-letter-of-intent.component';
import { CreateLetterOfIntentFullComponent } from './create-letter-of-intent-full/create-letter-of-intent-full.component';
import { LetterOfIntentSubmitComponent } from './letter-of-intent-submit/letter-of-intent-submit.component';
import { LetterOfIntentSubmitCheckComponent } from './letter-of-intent-submit-check/letter-of-intent-submit-check.component';

const routes = [
  {
    path: 'letter-of-intent',
    component: LetterOfIntentComponent,
  },
];

@NgModule({
  declarations: [
    LetterOfIntentComponent,
    LetterOfIntentInfoComponent,
    LetterOfIntentStatusComponent,
    CreateLetterOfIntentComponent,
    CreateLetterOfIntentFullComponent,
    LetterOfIntentSubmitComponent,
    LetterOfIntentSubmitCheckComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule,

    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
  ],
  exports: [
    LetterOfIntentComponent,
  ],
})

export class LetterOfIntentModule {
}
