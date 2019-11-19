import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { UsersComponent } from './users.component';

const routes = [
    {
        path     : 'users',
        component: UsersComponent
    }
];

@NgModule({
    declarations: [
        UsersComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        UsersComponent
    ]
})

export class UsersModule
{
}
