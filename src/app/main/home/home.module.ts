import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { HomeComponent } from './home.component';

const routes = [
    {
        path     : 'home',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        HomeComponent
    ]
})

export class HomeModule
{
}
